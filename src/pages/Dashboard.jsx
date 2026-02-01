import { useRef, useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Legend,
  Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import * as ui from '../config/ui';
import Sidebar from '../components/Sidebar';

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Legend, Tooltip);

export default function Dashboard({
  supabaseClient,
  session,
  isSessionLoading,
  isSidebarOpen,
  toggleSidebar
}) {
  const hasChartLoaded = useRef(false);
  const [startDate, setStartDate] = useState(moment().subtract(ui.defaultDayCount - 1, 'days'));
  const [endDate, setEndDate] = useState(moment());
  const [granularity, setGranularity] = useState(0);
  const [usage, setUsage] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [haveFontsLoaded, setHaveFontsLoaded] = useState(false);
  const tickColor = useColorModeValue(ui.lightTickColor, ui.darkTickColor);
  const gridColor = useColorModeValue(ui.lightGridColor, ui.darkGridColor);
  const toast = useToast();
  const labels = [];
  const formatLabel = (callCount, resultType, elapsedMs) => {
    return (
      callCount.toLocaleString() +
      (resultType ? ` ${resultType.toLowerCase()}` : '') +
      ((units) => {
        return resultType ? units : units.toUpperCase();
      })(` call${callCount == 1 ? '' : 's'}`) +
      (typeof elapsedMs == 'undefined'
        ? ''
        : ` (${(callCount > 0 ? elapsedMs / callCount / 1000 : 0).toFixed(2)}s mean)`)
    );
  };

  if (startDate && endDate) {
    const cursor = startDate.clone().startOf('day');

    if (!granularity) {
      while (cursor.isSameOrBefore(endDate, 'day')) {
        labels.push(cursor.format(ui.dateFormat));
        cursor.add(1, 'day');
      }
    } else {
      while (cursor.isSameOrBefore(endDate.clone().endOf('day'))) {
        labels.push(`${cursor.format(ui.dateFormat)} ${cursor.format(ui.timeFormat)}`);
        cursor.add(1, 'hour');
      }
    }
  }

  useEffect(() => {
    Promise.all([
      document.fonts.load(`${ui.horizontalLabelSize}px ${ui.headingFont}`),
      document.fonts.load(`${ui.verticalLabelSize}px ${ui.subheadingFont}`),
      document.fonts.load(`${ui.legendSize}px ${ui.headingFont}`),
      document.fonts.load(`${ui.tooltipSize}px ${ui.bodyFont}`)
    ]).finally(() => {
      setHaveFontsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (session && startDate && endDate) {
      let isCancelled = false;

      supabaseClient
        .from('usage')
        .select('usage_date, usage_time, result, count, elapsed_ms')
        .gte('usage_date', startDate.format(ui.dateFormat))
        .lte('usage_date', endDate.format(ui.dateFormat))
        .in('result', ['success', 'failure'])
        .then(({ data, error }) => {
          if (!isCancelled) {
            if (error) {
              const id = 'usage';

              if (!toast.isActive(id)) {
                toast({
                  id,
                  position: 'top',
                  status: 'error',
                  description: ui.errorMessage,
                  duration: ui.toastTimeoutMs
                });
              }

              console.error(error);
            } else {
              const buffer = { success: {}, failure: {} };

              for (const label of labels) {
                buffer.success[label] = { count: 0, elapsed_ms: 0 };
                buffer.failure[label] = { count: 0, elapsed_ms: 0 };
              }

              for (const { usage_date, usage_time, result, count, elapsed_ms } of data) {
                const label = usage_date + ['', ` ${usage_time}`][granularity];

                if (buffer[result]?.[label]) {
                  buffer[result][label].count += count;
                  buffer[result][label].elapsed_ms += elapsed_ms;
                }
              }

              setUsage(buffer);
              hasChartLoaded.current = true;
            }
          }
        });

      return () => {
        isCancelled = true;
      };
    }
  }, [supabaseClient, session, startDate, endDate, granularity, toast]);

  return session && !isSessionLoading ? (
    hasChartLoaded.current ? (
      <>
        <Flex my={ui.smMargin} justify='center' gap={3}>
          <DateRangePicker
            startDate={startDate}
            startDateId='start-date'
            endDate={endDate}
            endDateId='end-date'
            displayFormat={ui.dateFormat}
            focusedInput={focusedInput}
            numberOfMonths={1}
            minimumNights={0}
            readOnly
            enableOutsideDays
            hideKeyboardShortcutsPanel
            onFocusChange={(input) => {
              setFocusedInput(input);
            }}
            onDatesChange={({ startDate: from, endDate: to }) => {
              setUsage(null);
              setStartDate(from);
              setEndDate(to);
            }}
            isOutsideRange={(day) => {
              return day.isAfter(moment(), 'day');
            }}
          />
          <Menu variant='dropdown'>
            <MenuButton
              as={Button}
              variant='dropdown'
              size='lg'
              rightIcon={<ChevronDownIcon fontSize='2xl' />}
            >
              {[ui.dailyLabel, ui.hourlyLabel][granularity]}
            </MenuButton>
            <MenuList>
              <MenuItem
                borderRadius={ui.menuTopBorder}
                onClick={() => {
                  if (granularity) {
                    setUsage(null);
                    setGranularity(0);
                  }
                }}
              >
                {ui.dailyLabel}
              </MenuItem>
              <MenuItem
                borderRadius={ui.menuBottomBorder}
                onClick={() => {
                  if (!granularity) {
                    setUsage(null);
                    setGranularity(1);
                  }
                }}
              >
                {ui.hourlyLabel}
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        {usage && haveFontsLoaded ? (
          <Flex mx={ui.smMargin} justify='center' flex={1}>
            <Box w={ui.chartWidth}>
              <Line
                data={{
                  labels,
                  datasets: [
                    {
                      label: 'Successful',
                      data: labels.map((label) => {
                        return usage.success[label].count;
                      }),
                      borderColor: ui.royalBlue,
                      pointBackgroundColor: ui.royalBlue
                    },
                    {
                      label: 'Failed',
                      data: labels.map((label) => {
                        return usage.failure[label].count;
                      }),
                      borderColor: ui.ruddyPink,
                      pointBackgroundColor: ui.ruddyPink
                    }
                  ]
                }}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      ticks: {
                        minRotation: ui.labelRotation,
                        color: tickColor,
                        maxTicksLimit: ui.maxHorizontalTicks,
                        font: { family: ui.headingFont, size: ui.horizontalLabelSize }
                      },
                      grid: { display: false }
                    },
                    y: {
                      suggestedMin: 0,
                      ticks: {
                        precision: 0,
                        color: tickColor,
                        maxTicksLimit: ui.maxVerticalTicks,
                        font: { family: ui.subheadingFont, size: ui.verticalLabelSize },
                        callback(value) {
                          return formatLabel(value);
                        }
                      },
                      grid: { color: gridColor }
                    }
                  },
                  elements: {
                    line: { borderWidth: ui.lineWidth, tension: ui.lineTension },
                    point: { radius: ui.pointRadius, hoverRadius: ui.pointHoverRadius }
                  },
                  plugins: {
                    legend: {
                      position: 'chartArea',
                      align: 'end',
                      labels: {
                        boxHeight: 0,
                        color: tickColor,
                        font: { family: ui.headingFont, size: ui.legendSize }
                      }
                    },
                    tooltip: {
                      displayColors: false,
                      titleFont: { family: ui.bodyFont, size: ui.tooltipSize },
                      bodyFont: { family: ui.bodyFont, size: ui.tooltipSize },
                      callbacks: {
                        label(item) {
                          return formatLabel(
                            item.parsed.y,
                            item.dataset.label,
                            usage[{ Successful: 'success', Failed: 'failure' }[item.dataset.label]][
                              labels[item.dataIndex]
                            ].elapsed_ms
                          );
                        }
                      }
                    }
                  }
                }}
              />
            </Box>
          </Flex>
        ) : (
          <Flex justify='center' align='center' flex={1}>
            <Spinner size='xl' thickness={ui.spinnerWidth} color={ui.royalBlue} />
          </Flex>
        )}
        <Sidebar
          supabaseClient={supabaseClient}
          session={session}
          isOpen={isSidebarOpen}
          toggle={toggleSidebar}
        />
      </>
    ) : (
      <Flex justify='center' align='center' flex={1}>
        <Spinner size='xl' thickness={ui.spinnerWidth} color={ui.royalBlue} />
      </Flex>
    )
  ) : isSessionLoading ? (
    <Flex justify='center' align='center' flex={1}>
      <Spinner size='xl' thickness={ui.spinnerWidth} color={ui.royalBlue} />
    </Flex>
  ) : (
    <>
      <Heading variant='secondary' size='lg'>
        {ui.loginLabel}
      </Heading>
      <Flex justify='center' align='start' flex={1}>
        <Auth
          supabaseClient={supabaseClient}
          providers={[]}
          view='magic_link'
          redirectTo={ui.dashboardUrl}
          localization={{
            variables: { magic_link: { email_input_label: '', button_label: ui.magicLabel } }
          }}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'var(--chakra-colors-accent-secondary)',
                  brandAccent: 'var(--chakra-colors-chakra-inverse-bg)',
                  inputPlaceholder: 'var(--chakra-colors-chakra-label-color)'
                }
              }
            },
            style: {
              container: { gap: 0, width: ui.secondaryWidth },
              label: { marginBottom: 0 },
              input: {
                borderRadius: 'var(--chakra-radii-md)',
                borderColor: 'var(--chakra-colors-chakra-border-color)',
                background: 'var(--chakra-colors-chakra-inset-bg)',
                height: ui.controlDimension,
                font: 'var(--chakra-fontSizes-lg) var(--chakra-fonts-body)',
                color: 'var(--chakra-colors-chakra-body-text)'
              },
              button: {
                margin: ui.loginButtonMargin,
                border: ui.buttonBorder,
                height: ui.controlDimension,
                font: 'var(--chakra-fontSizes-lg) var(--chakra-fonts-body)',
                fontWeight: 'var(--chakra-fontWeights-bold)',
                transition: ui.transition
              }
            }
          }}
          showLinks={false}
        />
      </Flex>
    </>
  );
}
