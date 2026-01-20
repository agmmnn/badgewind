<div align="center">
<a href="https://badgewind.agmmnn.workers.dev/Badge-Wind?badgeStyle=bg-,border,text-(27px),border-cyan-500,rounded-full,text-2xl&leftStyle=bg-,text-rose-50,py-4,rounded-l-xl,h-full,text-2xl&rightStyle=bg-,rounded-r-xl,italic,h-full,text-2xl,pr-3,border-l,border-cyan-500&icon=ri:windy-line&iconStyle=text-cyan-500,h-8,w-8&font=space-grotesk">
<img src="https://badgewind.agmmnn.workers.dev/Badge-Wind?badgeStyle=bg-,border,text-(27px),border-cyan-500,rounded-full,text-2xl&leftStyle=bg-,text-rose-50,py-4,rounded-l-xl,h-full,text-2xl&rightStyle=bg-,rounded-r-xl,italic,h-full,text-2xl,pr-3,border-l,border-cyan-500&icon=ri:windy-line&iconStyle=text-cyan-500,h-8,w-8&font=space-grotesk"/>
</a>

<br/>
<p><strong>Utility-first SVG badges styled with Tailwind CSS.</strong><br>
Think shields.io — but fully customizable.</p>

<p>
<a href="https://badgewind.agmmnn.workers.dev"><strong>Use BadgeWind Studio &rarr;</strong></a>
  </p>
<br/>

[![Github](https://badgewind.agmmnn.workers.dev/BadgeWind?icon=simple-icons:github)](https://github.com/agmmnn/badgewind) [![Tailwind](https://badgewind.agmmnn.workers.dev/-?icon=simple-icons:tailwindcss)](https://tailwindcss.com/) [![Triangle Company](https://badgewind.agmmnn.workers.dev/Triangle-Company?badgeStyle=rounded-none,border-2,p-0&leftStyle=rounded-none,bg-zinc-100,text-zinc-800,mr-0&rightStyle=rounded-none,bg-zinc-800,text-white&icon=mdi:triangle&textShadow=false)](https://vercel.com/home) [![Spotify](https://badgewind.agmmnn.workers.dev/-Spotify?badgeStyle=bg-transparent,border-0,rounded-full&leftStyle=rounded-l-full,mr-1&rightStyle=rounded-r-full,rounded-l,bg-%5B%231ed760%5D,text-slate-700&icon=simple-icons:spotify&iconStyle=text-%5B%231ed760%5D)](https://open.spotify.com/user/agmmnn) [![Discord](<https://badgewind.agmmnn.workers.dev/-Midjourney?badgeStyle=border-0,rounded-full&leftStyle=rounded-full,mr-1,bg-(@525dea)&rightStyle=rounded-r-full,rounded-l,bg-transparent,pl-0,pr-2&icon=simple-icons:discord&iconStyle=text-white>)](https://discord.com/invite/midjourney)
![](https://github.com/agmmnn/badgewind/assets/16024979/68e63feb-a872-4bac-bbc2-52f49faca96d)

> _BadgeWind utilizes the [vercel/satori](https://github.com/vercel/satori) library under the hood._

</div>

## What is Badgewind?

Badgewind is a **utility-first alternative to shields.io**, powered by **Tailwind CSS**.

Instead of being limited to predefined themes, you can style every aspect of your badges—colors, borders, spacing, shadows, and fonts—using standard Tailwind utility classes.

- 🎨 **Full Control**: Use `bg-slate-700`, `text-sky-400`, `rounded-full`, etc.
- 🧱 **Iconify Support**: Access to 100,000+ icons (FontAwesome, Material, etc.).
- 📝 **Customizable**: Add any google font, layout customizaton support.
- 🖼️ **Vector Quality**: Sharp SVGs that scale perfectly.

## <img src="https://badgewind.agmmnn.workers.dev/Quick__Start?badgeStyle=boder-slate-800,text-(@D1D7E0),rounded-,bg-&leftStyle=bg-,text-2xl,&rightStyle=bg-,text-2xl&icon=memory:wind&iconStyle=h-7,w-7,mr-2&textShadow=false&font=jost" />

- Go to **[Badgewind Studio](https://badgewind.agmmnn.workers.dev/)** to start designing your badge.
- Or construct a URL manually:

```
https://badgewind.agmmnn.workers.dev/Hello-World?badgeStyle=bg-blue-500,text-white,rounded-0
```

**(That's it. It renders an SVG.)**

### Comparison

| Feature             | [shields.io](https://shields.io/)                                                                                                         | [BadgeWind](https://badgewind.agmmnn.workers.dev/)                                                                                                               |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Philosophy**      | Configuration-based                                                                                                                       | **Utility-first (Tailwind, _[Supported Tailwind utilities](https://github.com/jaredh159/tailwind-react-native-classnames/blob/master/supported-utilities.md)_)** |
| **Styling**         | Predefined themes (plastic, flat)                                                                                                         | **Infinite customization**                                                                                                                                       |
| **Icons**           | Limited (Simple Icons)                                                                                                                    | **All [Iconify](https://icon-sets.iconify.design/) Sets** (Material, Phosphor, etc.)                                                                             |
| **Layout**          | Fixed                                                                                                                                     | Flexible (sizes, spacing, standalone icons)                                                                                                                      |
| **Customization**   | Limited                                                                                                                                   | **Extensive**                                                                                                                                                    |
| ~~Service Support~~ | _Supports many services (e.g., [PyPI](https://shields.io/badges/py-pi-downloads), [npm](https://shields.io/badges/npm) download numbers)_ | _Coming soon..._                                                                                                                                                 |

## <img src="https://badgewind.agmmnn.workers.dev/Usage?badgeStyle=boder-slate-800,text-(@D1D7E0),rounded-,bg-&leftStyle=bg-,text-2xl,&rightStyle=bg-,text-2xl&icon=memory:arrow-right-circle&iconStyle=h-7,w-7,mr-2&textShadow=false&font=jost" />

### Tailwind Syntax (Recommended)

You apply styles using the standard URL parameters. Use comma-separated Tailwind classes.

| Parameter    | Description                                             |
| :----------- | :------------------------------------------------------ |
| `badgeStyle` | Container styles (e.g. `rounded-full,border-2`)         |
| `leftStyle`  | Left side text styles (e.g. `bg-blue-500,text-white`)   |
| `rightStyle` | Right side text styles (e.g. `font-bold,text-blue-500`) |
| `iconStyle`  | Icon styles (e.g. `w-5,h-5,text-white`)                 |

#### Example

```
https://badgewind.agmmnn.workers.dev/My-Badge?badgeStyle=bg-slate-900,rounded-lg&leftStyle=text-white
```

## <img src="https://badgewind.agmmnn.workers.dev/Gallery?badgeStyle=boder-slate-800,text-(@D1D7E0),rounded-,bg-&leftStyle=bg-,text-2xl,&rightStyle=bg-,text-2xl&icon=memory:box-light-round-up-left-stipple&iconStyle=h-7,w-7,mr-2&textShadow=false&font=jost" />

![](https://badgewind.agmmnn.workers.dev/Github-agmmnn?icon=simple-icons:github) ![](https://badgewind.agmmnn.workers.dev/Github-agmmnn) ![](https://badgewind.agmmnn.workers.dev/agmmnn?badgeStyle=text-lime-200&icon=simple-icons:github) ![](https://badgewind.agmmnn.workers.dev/-?icon=simple-icons:github) ![](https://badgewind.agmmnn.workers.dev/-?leftStyle=rounded-full&icon=simple-icons:github&iconStyle=text-sky-200,h-5,w-5,m-1)

![](https://badgewind.agmmnn.workers.dev/-Reactive?badgeStyle=rounded-full&leftStyle=rounded-full&rightStyle=bg-transparent,font-black,w-16&icon=simple-icons:react&iconStyle=text-[#61dafb],w-5,h-5)
![](https://badgewind.agmmnn.workers.dev/Project-v1.2.3?badgeStyle=p-0,rounded-full&leftStyle=rounded-l-full,mr-0&rightStyle=rounded-r-full,bg-zinc-800,text-white&icon=mdi:triangle&iconStyle=text-white) [![](https://badgewind.agmmnn.workers.dev/Triangle-Company?badgeStyle=rounded-none,border-2,p-0&leftStyle=rounded-none,bg-zinc-100,text-zinc-800,mr-0&rightStyle=rounded-none,bg-zinc-800,text-white&icon=mdi:triangle)](https://vercel.com/home) ![Spotify Follow](https://badgewind.agmmnn.workers.dev/Spotify-Listen?badgeStyle=bg-slate-700%2Cp-1%2Cborder-0%2Crounded-full&leftStyle=rounded-l-full%2Cmr-1&rightStyle=rounded-r-full%2Cbg-%5B%231ed760%5D%2Ctext-slate-700&icon=simple-icons%3Aspotify&iconStyle=text-%5B%231ed760%5D)

![License MIT](<https://badgewind.agmmnn.workers.dev/License-MIT?badgeStyle=bg-,border-(1px),border-(@333),rounded-full&leftStyle=bg-(@1E1F20),text-(@CED2D8),rounded-l-full&rightStyle=bg-(@161F38),text-(@5EA1F4),border-l,border-(@333),h-full,rounded-r-full&icon=mdi:shield&iconStyle=text-(@9CA3AF),h-4,w-4&textShadow=false&font=jetbrains-mono>) ![This__is Cool](<https://badgewind.agmmnn.workers.dev/This__is-Cool?leftStyle=rounded-none,bg-(@1E293B),text-zinc-100,mr-0,border-l-2,border-(@0070F3)&rightStyle=rounded-none,bg-zinc-800,text-white,border-l-(0.5px),border-(@0070F3),border-r-2,h-full&icon=mdi:earth&textShadow=false&font=lato>) ![Read__Later-](<https://badgewind.agmmnn.workers.dev/Read__Later-?badgeStyle=rounded-full,bg-(@ECFFFF),border-(1px),border-(@DAF5F8)&leftStyle=bg-,text-(@147091),mr-0,rounded-full&rightStyle=bg-,text-white,border-l-(0.5px),border-(@0070F3),border-r-2,h-full,rounded-full&icon=mdi:bookmark-add&textShadow=false&font=roboto>)

## <img src="https://badgewind.agmmnn.workers.dev/Advanced?badgeStyle=boder-slate-800,text-(@D1D7E0),rounded-,bg-&leftStyle=bg-,text-2xl,&rightStyle=bg-,text-2xl&icon=memory:box-light-horizontal-stipple&iconStyle=h-7,w-7,mr-2&textShadow=false&font=jost" />

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

### URL-Safe Syntax (Optional)

Normal Tailwind syntax uses characters that may break URLs (like `#` or `[]`).
If you need to write URLs manually and want to avoid encoding, use this syntax:

| Feature              | Standard (Encoded) | URL-Safe Shorthand |
| :------------------- | :----------------- | :----------------- |
| **Hex Colors**       | `bg-[#1ed760]`     | `bg-(@1ed760)`     |
| **Arbitrary Values** | `w-[50px]`         | `w-(50px)`         |

**Syntax reference:**

- Commas `,` separate classes
- Square brackets `[]` for arbitrary values (requires URL encoding)
- Parentheses `()` as alternative to brackets (no encoding needed)
- `@` as alternative to `#` inside parentheses

**Text formatting (same as shields.io):**

- Underscore `_` → Space ` `
- Double underscore `__` → Underscore `_`
- Double dash `--` → Dash `-`

## <img src="https://badgewind.agmmnn.workers.dev/Fonts?badgeStyle=boder-slate-800,text-(@D1D7E0),rounded-,bg-&leftStyle=bg-,text-2xl,&rightStyle=bg-,text-2xl&icon=memory:alpha-a&iconStyle=h-7,w-7,mr-2&textShadow=false&font=jost" />

You can use any font from [Google Fonts](https://fonts.google.com/). Just add the font name to the `font` parameter. For example:

```
https://badgewind.agmmnn.workers.dev/Project-v1.2.3?font=roboto
```

## <img src="https://badgewind.agmmnn.workers.dev/Roadmap?badgeStyle=boder-slate-800,text-(@D1D7E0),rounded-,bg-&leftStyle=bg-,text-2xl,&rightStyle=bg-,text-2xl&icon=memory:map&iconStyle=h-7,w-7,mr-2&textShadow=false&font=jost" />

- [ ] **Dynamic badges** (Live stats for basic integrations)
- [ ] **Progress & stat badges** (Bars, gauges)
- [ ] **Multiline / card-style badges**
- [ ] **shields.io compatibility layer** (Drop-in replacement URLs)

## License

MIT
