import { useState, useEffect } from 'react';
import { Box, Flex, Heading, Spinner, useToast } from '@chakra-ui/react';
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
  const [startDate, setStartDate] = useState(moment().subtract(ui.defaultDayCount - 1, 'days'));
  const [endDate, setEndDate] = useState(moment());
  const [usage, setUsage] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const toast = useToast();
  const dates = [];
  const formatLabel = (callCount, resultType) => {
    return (
      callCount.toLocaleString() +
      (resultType ? ` ${resultType.toLowerCase()}` : '') +
      ((units) => {
        return resultType ? units : units.toUpperCase();
      })(` call${callCount == 1 ? '' : 's'}`)
    );
  };

  if (startDate && endDate) {
    const cursor = startDate.clone();

    while (cursor.isSameOrBefore(endDate, 'day')) {
      dates.push(cursor.format(ui.dateFormat));
      cursor.add(1, 'day');
    }
  }

  useEffect(() => {
    if (session && startDate && endDate) {
      let isCancelled = false;

      supabaseClient
        .from('usage')
        .select('usage_date, result, count, elapsed_ms')
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

              for (const date of dates) {
                buffer.success[date] = { count: 0, elapsed_ms: 0 };
                buffer.failure[date] = { count: 0, elapsed_ms: 0 };
              }

              for (const { usage_date, result, count, elapsed_ms } of data) {
                if (buffer[result]?.[usage_date]) {
                  buffer[result][usage_date].count += count;
                  buffer[result][usage_date].elapsed_ms += elapsed_ms;
                }
              }

              setUsage(buffer);
            }
          }
        });

      return () => {
        isCancelled = true;
      };
    }
  }, [supabaseClient, session, startDate, endDate, toast]);

  return isSessionLoading ? (
    <Flex my={ui.mdMargin} minH={ui.secondaryHeight} justify='center' align='center'>
      <Spinner size='xl' thickness={ui.spinnerWidth} color={ui.royalBlue} />
    </Flex>
  ) : session ? (
    <>
      <Flex my={ui.smMargin} justify='center'>
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
      </Flex>
      {usage ? (
        <Flex mb={ui.xsMargin} minH={ui.secondaryHeight} justify='center'>
          <Box w={ui.chartWidth}>
            <Line
              data={{
                labels: dates,
                datasets: [
                  {
                    label: 'Successful',
                    data: dates.map((date) => {
                      return usage.success[date].count;
                    }),
                    borderColor: ui.royalBlue,
                    pointBackgroundColor: ui.royalBlue
                  },
                  {
                    label: 'Failed',
                    data: dates.map((date) => {
                      return usage.failure[date].count;
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
                      font: { family: ui.headingFont, size: ui.horizontalLabelSize }
                    },
                    grid: { display: false }
                  },
                  y: {
                    suggestedMin: 0,
                    ticks: {
                      precision: 0,
                      font: { family: ui.subheadingFont, size: ui.verticalLabelSize },
                      callback(value) {
                        return formatLabel(value);
                      }
                    }
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
                    labels: { boxHeight: 0, font: { family: ui.headingFont, size: ui.legendSize } }
                  },
                  tooltip: {
                    displayColors: false,
                    titleFont: { family: ui.bodyFont },
                    bodyFont: { family: ui.bodyFont },
                    callbacks: {
                      label(item) {
                        return formatLabel(item.parsed.y, item.dataset.label);
                      }
                    }
                  }
                }
              }}
            />
          </Box>
        </Flex>
      ) : (
        <Flex mb={ui.xsMargin} minH={ui.secondaryHeight} justify='center' align='center'>
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
    <>
      <Heading variant='secondary' size='lg'>
        {ui.loginLabel}
      </Heading>
      <Flex minH={ui.secondaryHeight} justify='center' align='start'>
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
