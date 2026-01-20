<div align="center">
<a href="https://badgewind.agmmnn.workers.dev/Badge-Wind?badgeStyle=bg-transparent,border,text-[27px],border-cyan-500,rounded-full,text-2xl&leftStyle=bg-transparent,text-rose-50,p-2,rounded-l-xl,h-full,text-2xl&rightStyle=bg-transparent,rounded-r-xl,italic,h-full,text-2xl,px-3,border-l,border-cyan-500&icon=ri:windy-line&iconStyle=text-cyan-500,h-11,w-11">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://badgewind.agmmnn.workers.dev/Badge-Wind?badgeStyle=bg-transparent,border,text-[27px],border-cyan-500,rounded-full,text-2xl&leftStyle=bg-transparent,text-rose-50,p-2,rounded-l-xl,h-full,text-2xl&rightStyle=bg-transparent,rounded-r-xl,italic,h-full,text-2xl,px-3,border-l,border-cyan-500&icon=ri:windy-line&iconStyle=text-cyan-500,h-11,w-11">
  <img alt="badgewind" src="https://badgewind.agmmnn.workers.dev/Badge-Wind?badgeStyle=bg-transparent,text-rose-900,border,text-[27px],border-cyan-500,rounded-full,text-2xl&leftStyle=bg-transparent,p-2,rounded-l-xl,h-full,text-2xl&rightStyle=bg-transparent,rounded-r-xl,italic,h-full,text-2xl,px-3,border-l,border-cyan-500&icon=ri:windy-line&iconStyle=text-cyan-500,h-11,w-11">
</picture>
</a>

Tailwind-styled markdown SVG badges, basically shields.io but customizable with Tailwind. _BadgeWind utilizes the [vercel/satori](https://github.com/vercel/satori) library under the hood._

[![Github](https://badgewind.agmmnn.workers.dev/BadgeWind?icon=simple-icons:github)](https://github.com/agmmnn/badgewind) [![Tailwind](https://badgewind.agmmnn.workers.dev/-?icon=simple-icons:tailwindcss)](https://tailwindcss.com/) [![Triangle Company](https://badgewind.agmmnn.workers.dev/Triangle-Company?badgeStyle=rounded-none,border-2,p-0&leftStyle=rounded-none,bg-zinc-100,text-zinc-800,mr-0&rightStyle=rounded-none,bg-zinc-800,text-white&icon=mdi:triangle&textShadow=false)](https://vercel.com/home) [![Spotify](https://badgewind.agmmnn.workers.dev/-Spotify?badgeStyle=bg-transparent,border-0,rounded-full&leftStyle=rounded-l-full,mr-1&rightStyle=rounded-r-full,rounded-l,bg-[#1ed760],text-slate-700&icon=simple-icons:spotify&iconStyle=text-[#1ed760])](https://open.spotify.com/user/agmmnn) [![Discord](https://badgewind.agmmnn.workers.dev/-Midjourney?badgeStyle=border-0,rounded-full&leftStyle=rounded-full,mr-1,bg-[#525dea]&rightStyle=rounded-r-full,rounded-l,bg-transparent,pl-0,pr-2&icon=simple-icons:discord&iconStyle=text-white)](https://discord.com/invite/midjourney)
![](https://github.com/agmmnn/badgewind/assets/16024979/68e63feb-a872-4bac-bbc2-52f49faca96d)

</div>

> <a href="https://github.com/jaredh159/tailwind-react-native-classnames/blob/master/supported-utilities.md"><picture><source media="(prefers-color-scheme: dark)" srcset="https://badgewind.agmmnn.workers.dev/Supported-Tailwind_Utilities?badgeStyle=border-2,border-slate-600,text-white,rounded-none,bg-transparent&leftStyle=bg-transparent&rightStyle=bg-transparent,border-l,border-slate-600&icon=devicon:tailwindcss&textShadow=false"><img alt="supported tailwind utilities" src="https://badgewind.agmmnn.workers.dev/Supported-Tailwind_Utilities?badgeStyle=border-2,border-slate-800,text-black,rounded-none,bg-transparent&leftStyle=bg-transparent&rightStyle=bg-transparent,border-l,border-slate-800&icon=devicon:tailwindcss&textShadow=false"></picture></a>

| Feature             | [Shields.io](https://shields.io/)                                                                                                         | [BadgeWind](http://localhost:3001/)                                                                                                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Styling             | Predefined styles                                                                                                                         | Extensive customization options using [Tailwind CSS](https://tailwindcss.com/) ([Supported Tailwind utilities](https://github.com/jaredh159/tailwind-react-native-classnames/blob/master/supported-utilities.md)) |
| Icon Support        | Only [Simple Icons](https://simpleicons.org/)                                                                                             | Support for all [Iconify](https://icon-sets.iconify.design/) icon sets (including [Simple Icons](https://icon-sets.iconify.design/simple-icons/))                                                                 |
| Flexibility         | Limited layout options                                                                                                                    | More layout flexibility (such as size, only icon)                                                                                                                                                                 |
| ~~Service Support~~ | _Supports many services (e.g., [PyPI](https://shields.io/badges/py-pi-downloads), [npm](https://shields.io/badges/npm) download numbers)_ | _Does not support services yet_                                                                                                                                                                                   |

## Usage

Use [Badgewind Studio](https://badgewind.agmmnn.workers.dev/) to create your badges.

### Simple Usage

[![Github](https://badgewind.agmmnn.workers.dev/Github-agmmnn?icon=simple-icons:github)](https://github.com/agmmnn)

```
https://badgewind.agmmnn.workers.dev/Github-agmmnn?icon=simple-icons:github
```

### URL Parameters

| Parameter      | Description                              | Example                        |
| -------------- | ---------------------------------------- | ------------------------------ |
| `[left-right]` | Text for the left and right sides (path) | `Github-Stars`                 |
| `badgeStyle`   | Main badge container styles              | `rounded-full,border-2`        |
| `leftStyle`    | Left section styles                      | `bg-[#1ed760],text-white`      |
| `rightStyle`   | Right section styles                     | `bg-zinc-800`                  |
| `icon`         | Iconify icon code                        | `simple-icons:github`          |
| `iconStyle`    | Icon styles                              | `text-cyan-500,h-5,w-5`        |
| `textShadow`   | Enable text shadow                       | `true` (default) or `false`    |
| `font`         | Font family                              | `inter`, `roboto`, `fira-code` |

### Tailwind Syntax

Use standard Tailwind CSS class names separated by commas:

```
badgeStyle=bg-slate-700,p-1,rounded-full,text-[#1ed760]
```

**URL-safe characters:**

- Commas `,` separate classes
- Square brackets `[]` for arbitrary values (e.g., `text-[27px]`, `bg-[#ff0000]`)

**Text formatting (same as shields.io):**

- Underscore `_` → Space ` `
- Double underscore `__` → Underscore `_`
- Double dash `--` → Dash `-`

### URL Formats

BadgeWind supports multiple URL formats:

**Standard URL:**

```
https://badgewind.agmmnn.workers.dev/Badge-Wind?badgeStyle=rounded-xl,bg-slate-700
```

**Base64 URL (for platforms with character restrictions):**

```
https://badgewind.agmmnn.workers.dev/Badge-Wind?s=eyJiYWRnZVN0eWxlIjoicm91bmRlZC14bCxiZy1zbGF0ZS03MDAifQ
```

The `?s=` parameter accepts a URL-safe base64 encoded JSON object with all style parameters.

## Examples

![](https://badgewind.agmmnn.workers.dev/Github-agmmnn?icon=simple-icons:github) ![](https://badgewind.agmmnn.workers.dev/Github-agmmnn) ![](https://badgewind.agmmnn.workers.dev/agmmnn?badgeStyle=text-lime-200&icon=simple-icons:github) ![](https://badgewind.agmmnn.workers.dev/-?icon=simple-icons:github) ![](https://badgewind.agmmnn.workers.dev/-?leftStyle=rounded-full&icon=simple-icons:github&iconStyle=text-sky-200,h-5,w-5,m-1)

![](https://badgewind.agmmnn.workers.dev/-Reactive?badgeStyle=rounded-full&leftStyle=rounded-full&rightStyle=bg-transparent,font-black,w-16&icon=simple-icons:react&iconStyle=text-[#61dafb],w-5,h-5)
![](https://badgewind.agmmnn.workers.dev/Project-v1.2.3?badgeStyle=p-0,rounded-full&leftStyle=rounded-l-full,mr-0&rightStyle=rounded-r-full,bg-zinc-800,text-white&icon=mdi:triangle&iconStyle=text-white) [![](https://badgewind.agmmnn.workers.dev/Triangle-Company?badgeStyle=rounded-none,border-2,p-0&leftStyle=rounded-none,bg-zinc-100,text-zinc-800,mr-0&rightStyle=rounded-none,bg-zinc-800,text-white&icon=mdi:triangle)](https://vercel.com/home)

### Spotify Style

[![](https://badgewind.agmmnn.workers.dev/Spotify-agmmnn?badgeStyle=bg-slate-700,p-1,border-0,rounded-full&leftStyle=rounded-l-full,mr-1&rightStyle=rounded-r-full,bg-[#1ed760],text-slate-700&icon=simple-icons:spotify&iconStyle=text-[#1ed760])](https://open.spotify.com/)

```
https://badgewind.agmmnn.workers.dev/Spotify-agmmnn?badgeStyle=bg-slate-700,p-1,border-0,rounded-full&leftStyle=rounded-l-full,mr-1&rightStyle=rounded-r-full,bg-[#1ed760],text-slate-700&icon=simple-icons:spotify&iconStyle=text-[#1ed760]
```

### Version Badge

![](https://badgewind.agmmnn.workers.dev/Project-Version_v1.2.3?badgeStyle=p-0,rounded-full&leftStyle=rounded-l-full,mr-0&rightStyle=rounded-r-full,bg-purple-800,text-white&icon=feather:code&iconStyle=text-white,bg-purple-800,rounded-full)

```
https://badgewind.agmmnn.workers.dev/Project-Version_v1.2.3?badgeStyle=p-0,rounded-full&leftStyle=rounded-l-full,mr-0&rightStyle=rounded-r-full,bg-purple-800,text-white&icon=feather:code&iconStyle=text-white,bg-purple-800,rounded-full
```

## Available Fonts

You can use any font from [Google Fonts](https://fonts.google.com/). Just add the font name to the `font` parameter. For example:

```
https://badgewind.agmmnn.workers.dev/Project-v1.2.3?font=roboto
```

## Future Enhancements

- More Ready-Made styles, flat style etc.
- Icon Insertion in Text, like "my [icon=simple-icons:github] link"

## License

MIT
