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
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import * as ui from '../config/ui';
import Sidebar from '../components/Sidebar';

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Legend, Tooltip);

export default function Dashboard({ supabaseClient, session, isSidebarOpen, toggleSidebar }) {
  const [usage, setUsage] = useState(null);
  const toast = useToast();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();

    date.setDate(date.getDate() - (6 - i));

    return date.toISOString().split('T')[0];
  });
  const usageBuffer = { success: {}, failure: {} };
  const formatLabel = (callCount, resultType) => {
    return (
      callCount.toLocaleString() +
      (resultType ? ` ${resultType.toLowerCase()}` : '') +
      ((units) => {
        return resultType ? units : units.toUpperCase();
      })(` call${callCount == 1 ? '' : 's'}`)
    );
  };

  for (const date of dates) {
    usageBuffer.success[date] = { count: 0, elapsed_ms: 0 };
    usageBuffer.failure[date] = { count: 0, elapsed_ms: 0 };
  }

  useEffect(() => {
    if (session) {
      const date = new Date();

      date.setDate(date.getDate() - 6);

      supabaseClient
        .from('usage')
        .select('usage_date, result, count, elapsed_ms')
        .gte('usage_date', date.toISOString().split('T')[0])
        .in('result', ['success', 'failure'])
        .then(({ data, error }) => {
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
            for (const { usage_date, result, count, elapsed_ms } of data) {
              usageBuffer[result][usage_date].count += count;
              usageBuffer[result][usage_date].elapsed_ms += elapsed_ms;
            }

            setUsage(usageBuffer);
          }
        });
    }
  }, [session]);

  return session ? (
    <>
      {usage ? (
        <Flex my={ui.mdMargin} minH={ui.secondaryHeight} justify='center'>
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
                      font: { family: ui.headingFont, size: ui.xLabelSize }
                    },
                    grid: { display: false }
                  },
                  y: {
                    suggestedMin: 0,
                    ticks: {
                      precision: 0,
                      font: { family: ui.subheadingFont, size: ui.yLabelSize },
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
        <Flex my={ui.mdMargin} minH={ui.secondaryHeight} justify='center' align='center'>
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
