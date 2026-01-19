<div align="center">
<a href="https://badgewind.agmmnn.workers.dev/Badge-Wind?badgeStyle=bg-|border|text-(27px)|border-cyan-500|rounded-full|text-2xl&leftStyle=bg-|text-rose-50|p-2|rounded-l-xl|h-full|text-2xl&rightStyle=bg-|rounded-r-xl|italic|h-full|text-2xl|px-3|border-l|border-cyan-500&icon=ri:windy-line&iconStyle=text-cyan-500|h-11|w-11">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://badgewind.agmmnn.workers.dev/Badge-Wind?badgeStyle=bg-|border|text-(27px)|border-cyan-500|rounded-full|text-2xl&leftStyle=bg-|text-rose-50|p-2|rounded-l-xl|h-full|text-2xl&rightStyle=bg-|rounded-r-xl|italic|h-full|text-2xl|px-3|border-l|border-cyan-500&icon=ri:windy-line&iconStyle=text-cyan-500|h-11|w-11">
  <img alt="badgewind" src="https://badgewind.agmmnn.workers.dev/Badge-Wind?badgeStyle=bg-|text-rose-900|border|text-(27px)|border-cyan-500|rounded-full|text-2xl&leftStyle=bg-|p-2|rounded-l-xl|h-full|text-2xl&rightStyle=bg-|rounded-r-xl|italic|h-full|text-2xl|px-3|border-l|border-cyan-500&icon=ri:windy-line&iconStyle=text-cyan-500|h-11|w-11">
</picture>
</a>

Tailwind-styled markdown SVG badges, basically shields.io but customizable with Tailwind. _BadgeWind utilizes the [vercel/satori](https://github.com/vercel/satori) library under the hood._

[![Github](https://badgewind.agmmnn.workers.dev/BadgeWind?icon=simple-icons:github)](https://github.com/agmmnn/badgewind) [![Tailwind](https://badgewind.agmmnn.workers.dev/-?icon=simple-icons:tailwindcss)](https://tailwindcss.com/) [![Triangle Company](https://badgewind.agmmnn.workers.dev/Triangle-Company?badgeStyle=rounded-none|border-2|p-0&leftStyle=rounded-none|bg-zinc-100|text-zinc-800|mr-0&rightStyle=rounded-none|bg-zinc-800|text-white&icon=mdi:triangle&textShadow=false)](https://vercel.com/home) [![Spotify](<https://badgewind.agmmnn.workers.dev/-Spotify?badgeStyle=bg-|border-0|rounded-full&leftStyle=rounded-l-full|mr-1&rightStyle=rounded-r-full|rounded-l|bg-(@1ed760)|text-slate-700&icon=simple-icons:spotify&iconStyle=text-(@1ed760)>)](https://open.spotify.com/user/agmmnn) [![Discord](<https://badgewind.agmmnn.workers.dev/-Midjourney?badgeStyle=border-0|rounded-full&leftStyle=rounded-full|mr-1|bg-(@525dea)&rightStyle=rounded-r-full|rounded-l|bg-|pl-0|pr-2&icon=simple-icons:discord&iconStyle=text-white>)](https://discord.com/invite/midjourney)
![](https://github.com/agmmnn/badgewind/assets/16024979/68e63feb-a872-4bac-bbc2-52f49faca96d)

</div>

> <a href="https://github.com/jaredh159/tailwind-react-native-classnames/blob/master/supported-utilities.md"><picture><source media="(prefers-color-scheme: dark)" srcset="https://badgewind.agmmnn.workers.dev/Supported-Tailwind_Utilities?badgeStyle=border-2|border-slate-600|text-white|rounded-none|bg-&leftStyle=bg-&rightStyle=bg-|border-l|border-slate-600&icon=devicon:tailwindcss&textShadow=false"><img alt="supported tailwind utilities" src="https://badgewind.agmmnn.workers.dev/Supported-Tailwind_Utilities?badgeStyle=border-2|border-slate-800|text-black|rounded-none|bg-&leftStyle=bg-&rightStyle=bg-|border-l|border-slate-800&icon=devicon:tailwindcss&textShadow=false"></picture></a>

| Feature             | [Shields.io](https://shields.io/)                                                                                                         | [BadgeWind](http://localhost:3001/)                                                                                                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Styling             | Predefined styles                                                                                                                         | Extensive customization options using [Tailwind CSS](https://tailwindcss.com/) ([Supported Tailwind utilities](https://github.com/jaredh159/tailwind-react-native-classnames/blob/master/supported-utilities.md)) |
| Icon Support        | Only [Simple Icons](https://simpleicons.org/)                                                                                             | Support for all [Iconify](https://icon-sets.iconify.design/) icon sets (including [Simple Icons](https://icon-sets.iconify.design/simple-icons/))                                                                 |
| Flexibility         | Limited layout options                                                                                                                    | More layout flexibility (such as size, only icon)                                                                                                                                                                 |
| ~~Service Support~~ | _Supports many services (e.g., [PyPI](https://shields.io/badges/py-pi-downloads), [npm](https://shields.io/badges/npm) download numbers)_ | _Does not support services yet_                                                                                                                                                                                   |

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://badgewind.agmmnn.workers.dev/Usage?badgeStyle=boder-slate-800|text-white|rounded-|bg-&leftStyle=bg-|text-2xl&rightStyle=bg-|border-l|border-slate-800&icon=memory:bow-arrow&textShadow=false&iconStyle=h-6|w-6"><img alt="supported tailwind utilities" src="https://badgewind.agmmnn.workers.dev/Usage?badgeStyle=boder-slate-800|text-black|rounded-|bg-&leftStyle=bg-|text-2xl&rightStyle=bg-|border-l|border-slate-800&icon=memory:bow-arrow&textShadow=false&iconStyle=h-6|w-6"></picture>

### Simple Usage

[![Github](https://badgewind.agmmnn.workers.dev/Github-agmmnn?icon=simple-icons:github)](https://github.com/agmmnn)

```
https://badgewind.agmmnn.workers.dev/Github-agmmnn?icon=simple-icons:github
```

### Variables

- \[left-right\]: Text for the left and right sides of the badge (Text). _e.g: Triangle-Company_.
- `badgeStyle`: Main badge div (Tailwind style).
- `leftStyle`: Style for the left div of the badge (Tailwind style).
- `rightStyle`: Style for the right div of the badge (Tailwind style).
- `icon`: Icon to show (Iconify icon code).
- `iconStyle`: Style for the icon SVG (Tailwind style).
- `textShadow`: Enable or disable text shadow (boolean, default true).

### Special Symbols

You can use [URL encoding](https://www.urlencoder.org/) or simply avoid encoding by using **special symbols**.

**For Text:**

Same as shields.io

- Underscore `_` : Space ` `
- Double underscore `__` : Underscore `_`
- Double dash `--` : Dash `-`

**For Style:**

- `|`: Space ` `
- `(` `)`: `[` `]`
- `@`: `#`

```
# these are identical:
h-5|bg-(@fff)|text-(16px)
h-5 bg-[#fff] text-[16px]
```

## <picture><source media="(prefers-color-scheme: dark)" srcset="https://badgewind.agmmnn.workers.dev/Examples?badgeStyle=boder-slate-800|text-white|rounded-|bg-&leftStyle=bg-|text-2xl&rightStyle=bg-|border-l|border-slate-800&icon=memory:map&textShadow=false&iconStyle=h-6|w-6"><img alt="supported tailwind utilities" src="https://badgewind.agmmnn.workers.dev/Examples?badgeStyle=boder-slate-800|text-black|rounded-|bg-&leftStyle=bg-|text-2xl&rightStyle=bg-|border-l|border-slate-800&icon=memory:map&textShadow=false&iconStyle=h-6|w-6"></picture>

![](https://badgewind.agmmnn.workers.dev/Github-agmmnn?icon=simple-icons:github) ![](https://badgewind.agmmnn.workers.dev/Github-agmmnn) ![](https://badgewind.agmmnn.workers.dev/agmmnn?badgeStyle=text-lime-200&icon=simple-icons:github) ![](https://badgewind.agmmnn.workers.dev/-?icon=simple-icons:github) ![](https://badgewind.agmmnn.workers.dev/-?leftStyle=rounded-full&icon=simple-icons:github&iconStyle=text-sky-200|h-5|w-5|m-1)

![](<https://badgewind.agmmnn.workers.dev/-Reactive?badgeStyle=rounded-full&leftStyle=rounded-full&rightStyle=bg-transparent|font-black|w-16&icon=simple-icons:react&iconStyle=text-(@61dafb)|w-5|h-5>)
![](https://badgewind.agmmnn.workers.dev/Project-v1.2.3?badgeStyle=p-0|rounded-full&leftStyle=rounded-l-full|mr-0&rightStyle=rounded-r-full|bg-zinc-800|text-white&icon=mdi:triangle&iconStyle=text-white) [![](https://badgewind.agmmnn.workers.dev/Triangle-Company?badgeStyle=rounded-none|border-2|p-0&leftStyle=rounded-none|bg-zinc-100|text-zinc-800|mr-0&rightStyle=rounded-none|bg-zinc-800|text-white&icon=mdi:triangle)](https://vercel.com/home)

[![](<https://badgewind.agmmnn.workers.dev/Spotify-agmmnn?badgeStyle=bg-slate-700|p-1|border-0|rounded-full&leftStyle=rounded-l-full|mr-1&rightStyle=rounded-r-full|bg-(@1ed760)|text-slate-700&icon=simple-icons:spotify&iconStyle=text-(@1ed760)>)](<https://badgewind.agmmnn.workers.dev/Spotify-agmmnn?badgeStyle=bg-slate-700|p-1|border-0|rounded-full&leftStyle=rounded-l-full|mr-1&rightStyle=rounded-r-full|bg-white|text-slate-700&icon=simple-icons:spotify&iconStyle=text-(@1ed760)>)

- Spotify-agmmnn
- `badgeStyle`=bg-slate-700|p-1|border-0|rounded-full
- `leftStyle`=rounded-l-full|mr-1
- `rightStyle`=rounded-r-full|bg-(@1ed760)|text-slate-700
- `icon`=simple-icons:spotify
- `iconStyle`=text-(@1ed760)

```
https://badgewind.agmmnn.workers.dev/Spotify-agmmnn?badgeStyle=bg-slate-700|p-1|border-0|rounded-full&leftStyle=rounded-l-full|mr-1&rightStyle=rounded-r-full|bg-(@1ed760)|text-slate-700&icon=simple-icons:spotify&iconStyle=text-(@1ed760)
```

![](https://badgewind.agmmnn.workers.dev/Project-Version_v1.2.3?badgeStyle=p-0|rounded-full&leftStyle=rounded-l-full|mr-0&rightStyle=rounded-r-full|bg-purple-800|text-white&icon=feather:code&iconStyle=text-white|bg-purple-800|rounded-full)

- Project-Version_v1.2.3
- `badgeStyle`=p-0|rounded-full
- `leftStyle`=rounded-l-full|mr-0
- `rightStyle`=rounded-r-full|bg-purple-800|text-white
- `icon`=feather:code
- `iconStyle`=text-white|bg-purple-800|rounded-full

```
https://badgewind.agmmnn.workers.dev/Project-Version_v1.2.3?badgeStyle=p-0|rounded-full&leftStyle=rounded-l-full|mr-0&rightStyle=rounded-r-full|bg-purple-800|text-white&icon=feather:code&iconStyle=text-white|bg-purple-800|rounded-full
```

<details>
<summary>Badge component</summary>

```tsx
<div
  tw={twMerge(
    "flex bg-[#314361] text-white border-b-2 border-slate-700 rounded-md items-center leading-3 text-[11px]",
    badgeStyle,
  )}
>
  <div
    tw={twMerge(
      "flex bg-[#445d87] rounded-l-md p-1 justify-center items-center text-[11px]",
      left && right ? "rounded-l-md" : "rounded-md",
      leftStyle,
    )}
  >
    {icon && (
      <IconElement
        icon={icon}
        iconStyle={twMerge(
          "h-3.5 w-3.5",
          left || right ? "mr-1" : "",
          left === "" && "mr-0",
          iconStyle && iconStyle,
        )}
      />
    )}
    {left && <div style={textStyle}>{left}</div>}
  </div>
  {right && (
    <div
      tw={twMerge(
        "flex bg-[#2f86cf] p-1 items-center leading-3 text-[11px]",
        left && right ? "rounded-r-md" : "",
        rightStyle,
      )}
    >
      <div style={textStyle}>{right}</div>
    </div>
  )}
</div>
```

</details>

## Future Enhancements

- Expanded Font Support.
- More Ready-Made styles, flat style etc.
- Icon Insertion in Text, like "my [icon=simple-icons:github] link".
- Gradient support ([twrnc](https://github.com/jaredh159/tailwind-react-native-classnames/blob/master/supported-utilities.md) does not support gradients but maybe can be implemented manually).

## License

MIT
