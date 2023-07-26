import fs from "fs"
import path from "path"
import { SVGProps } from "react"
import { Parser } from "html-to-react"
import { twMerge } from "tailwind-merge"

type CustomSVGProps = SVGProps<SVGSVGElement> & { tw: any }

const assetsDir = path.join(process.cwd(), "assets")

const IconElement = ({ icon, iconStyle }) => {
  const htmlParser = Parser()
  const tw = { tw: iconStyle }

  const [iconSet, iconName] = icon.split(":")
  const iconFile = JSON.parse(
    fs.readFileSync(`${assetsDir}/iconify/${iconSet}.json`, "utf8")
  )
  const iconData = iconFile.icons[iconName]
  const height = iconData.height || iconFile.info.height
  console.log(iconData.height, iconFile.info.height)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...(tw as CustomSVGProps)}
      height={height}
      width={height}
      viewBox={`0 0 ${height} ${height}`}
    >
      {htmlParser.parse(iconData.body)}
    </svg>
  )
}

const processStyle = (styleText) => {
  if (styleText) {
    const processedText = styleText
      .replace("(", "[")
      .replace(")", "]")
      .replace("@", "#")
    return processedText.split("|").join(" ")
  }
}

function processText(text) {
  const parts = text.split(/(?<!-)-(?!-)/)
  const replacedParts = parts.map((part) => {
    let replacedPart = part.replace(/__(?=[^ ])/g, "_")
    replacedPart = replacedPart.replace(/--/g, "-")
    replacedPart = replacedPart.replace(/_/g, " ")
    return replacedPart
  })
  return replacedParts
}

export default function Badge({ text, query }) {
  const [left, right] = processText(text)
  const badgeStyle = processStyle(query.get("badgeStyle"))
  const leftStyle = processStyle(query.get("leftStyle"))
  const rightStyle = processStyle(query.get("rightStyle"))
  const icon = query.get("icon")
  const iconStyle = processStyle(query.get("iconStyle"))

  const textShadow = query.get("textShadow")
  const textStyle =
    textShadow !== "false" ? { textShadow: "0px 1px 0px rgba(1,1,1, 0.3)" } : {}

  console.log(textShadow, textStyle)

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "transparent",
        textRendering: "geometricPrecision",
      }}
    >
      <div
        // style={{
        //   background:
        //     "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
        // }}
        tw={twMerge(
          "flex bg-slate-700 text-white  border-b-2 border-slate-700 rounded-md items-center leading-3 text-[11px]",
          badgeStyle
        )}
      >
        <div
          tw={twMerge(
            "flex bg-[#445d87] rounded-l-md p-1 justify-center items-center text-[11px]",
            left && right ? "rounded-l-md" : "rounded-md",
            leftStyle
          )}
        >
          {icon && (
            <IconElement
              icon={icon}
              iconStyle={twMerge(
                "h-3.5 w-3.5",
                left || right ? "mr-1" : "",
                left === "" && "mr-0",
                iconStyle && iconStyle
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
              rightStyle
            )}
          >
            <div style={textStyle}>{right}</div>
          </div>
        )}
      </div>
    </div>
  )
}
