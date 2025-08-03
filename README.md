# ![Agent First](assets/social/logotype-optimized.png) [![X post](assets/social/x-post-optimized.png)](https://x.com/intent/post?text=Enhance%20your%20AI%20agent%20with%20research%20and%20browsing%20abilities%3A&url=https%3A%2F%2Fagentfirst.dev%2F%3Fref%3Dgithub&via=agentfirstdev)

*The missing services for agent-first development*

[TODO: Add website description.]

The site is developed using [Node.js 22.x](https://nodejs.org/en/download) (due to Amazon Linux 2023
availability), [Yarn](https://yarnpkg.com/), [React](https://react.dev/),
[Chakra UI](https://chakra-ui.com/), and [Vite](https://vite.dev/). Follow the steps below to run
the site on Amazon Linux or macOS.

#### Amazon Linux prerequisites

```shell
$ sudo yum update -y
$ sudo yum install -y git
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
$ cd
$ . .nvm/nvm.sh
$ nvm install --lts
$ sudo curl https://dl.yarnpkg.com/rpm/yarn.repo -o /etc/yum.repos.d/yarn.repo
$ sudo yum install -y yarn
```

#### macOS prerequisites

```shell
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
$ cd
$ echo -e '\neval "$(/opt/homebrew/bin/brew shellenv)"' >> .zprofile
$ source .zprofile
$ brew install node@22 yarn
$ echo 'export PATH="/opt/homebrew/opt/node@22/bin:$PATH"' >> .zshrc
$ source .zshrc
```

#### Dependency installation

```shell
$ git clone https://github.com/agentfirstdev/www
$ cd www
$ yarn
```

#### Development startup

```shell
$ yarn dev
```

#### Production compilation

```shell
$ yarn build
```

#### Production testing

```shell
$ yarn preview
```

## License

Copyright 2025– Agent First Dev, LLC.

This program is free software, excluding the brand features and third-party portions of the program
identified in the [Exceptions](#exceptions) below: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software Foundation, either
version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
[GNU General Public License](https://www.gnu.org/licenses/gpl-3.0.html) for more details.

## Exceptions

The Agent First logos, trademarks, domain names, and other brand features used in this program
cannot be reused without permission and no license is granted thereto.

Further, these third-party portions of the program and any use thereof are subject to their own
licensing terms:

* [Permanent Marker](https://fonts.google.com/specimen/Permanent+Marker)
* [Indie Flower](https://fonts.google.com/specimen/Indie+Flower)
* [Lato](https://fonts.google.com/specimen/Lato)
