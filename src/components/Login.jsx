import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import * as ui from '../config/ui';

export default function Login({
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
              brand: 'var(--chakra-colors-bg-button)',
              brandAccent: 'var(--chakra-colors-bg-inverted)',
              inputPlaceholder: 'var(--chakra-colors-chakra-placeholder-color)',
              messageBorder: 'var(--chakra-colors-bg-success)',
              messageBackground: 'var(--chakra-colors-bg-success)',
              messageText: 'var(--chakra-colors-fg-success)',
              messageBorderDanger: 'var(--chakra-colors-bg-failure)',
              messageBackgroundDanger: 'var(--chakra-colors-bg-failure)',
              messageTextDanger: 'var(--chakra-colors-fg-failure)'
            }
          }
        },
        style: {
          container: { ...(margin != null && { margin }), ...(width != null && { width }), gap: 0 },
          label: { marginBottom: 0 },
          input: {
            ...(textboxMargin != null && { marginTop: textboxMargin }),
            borderRadius: 'var(--chakra-radii-md)',
            borderColor: 'var(--chakra-colors-chakra-border-color)',
            ...(textboxBackground && { background: textboxBackground }),
            height: ui.controlDimension,
            font,
            color: 'var(--chakra-colors-chakra-body-text)'
          },
          button: {
            margin: ui.loginButtonMargin,
            border: ui.buttonBorder,
            borderRadius: 'var(--chakra-radii-md)',
            height: ui.controlDimension,
            font,
            fontWeight: 'var(--chakra-fontWeights-bold)',
            transition: ui.transition
          },
          message: { marginTop: ui.loginMessageMargin, padding: ui.loginMessagePadding, font }
        }
      }}
      showLinks={false}
    />
  );
}
