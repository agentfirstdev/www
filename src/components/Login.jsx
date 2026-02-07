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
              brandAccent: 'var(--chakra-colors-chakra-inverse-bg)',
              inputPlaceholder: 'var(--chakra-colors-chakra-label-color)'
            }
          }
        },
        style: {
          container: { gap: 0, ...(margin != null && { margin }), ...(width != null && { width }) },
          label: { marginBottom: 0 },
          input: {
            borderColor: 'var(--chakra-colors-chakra-border-color)',
            height: ui.controlDimension,
            color: 'var(--chakra-colors-chakra-body-text)',
            font,
            ...(textboxMargin != null && { marginTop: textboxMargin }),
            ...(textboxBackground != null && { background: textboxBackground })
          },
          button: {
            margin: ui.loginButtonMargin,
            border: ui.buttonBorder,
            height: ui.controlDimension,
            fontWeight: 'var(--chakra-fontWeights-bold)',
            transition: ui.transition,
            font
          }
        }
      }}
      showLinks={false}
    />
  );
}
