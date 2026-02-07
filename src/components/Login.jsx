import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import * as ui from '../config/ui';

export default function Checkout({
  supabaseClient,
  margin,
  width,
  font,
  textboxMargin,
  textboxBackground,
  redirectUrl
}) {
  return (
    <Auth
      supabaseClient={supabaseClient}
      providers={[]}
      view='magic_link'
      redirectTo={redirectUrl}
      localization={{
        variables: { magic_link: { email_input_label: '', button_label: ui.magicLabel } }
      }}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: 'var(--chakra-colors-accent-secondary)',
              brandAccent: 'var(--chakra-colors-bg-inverted)',
              inputPlaceholder: 'var(--chakra-colors-chakra-placeholder-color)'
            }
          }
        },
        style: {
          container: { ...(margin != null && { margin }), ...(width != null && { width }), gap: 0 },
          label: { marginBottom: 0 },
          input: {
            ...(textboxMargin != null && { marginTop: textboxMargin }),
            borderColor: 'var(--chakra-colors-chakra-border-color)',
            ...(textboxBackground != null && { background: textboxBackground }),
            height: ui.controlDimension,
            font,
            color: 'var(--chakra-colors-chakra-body-text)'
          },
          button: {
            margin: ui.loginButtonMargin,
            border: ui.buttonBorder,
            height: ui.controlDimension,
            font,
            fontWeight: 'var(--chakra-fontWeights-bold)',
            transition: ui.transition
          }
        }
      }}
      showLinks={false}
    />
  );
}
