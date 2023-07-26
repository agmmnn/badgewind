import fs from "fs"
import path from "path"
import { NextRequest, NextResponse } from "next/server"
import satori from "satori"

import Badge from "./components"

const assetsDir = path.join(process.cwd(), "assets")
const fontData = fs.readFileSync(assetsDir + "/verdana.ttf")

export async function GET(req, { params }) {
  const { text } = params
  const query = req.nextUrl.searchParams

  let svg = await satori(<Badge text={text} query={query} />, {
    // width: 600,
    // height: 400,
    // debug: true,
    embedFont: false,
    fonts: [
      {
        name: "Verdana",
        data: fontData,
      },
    ],
  })

  svg = svg.replaceAll(
    'font-family="serif"',
    'font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision"'
  )

  return new NextResponse(svg, {
    status: 200,
    headers: { "Content-Type": "image/svg+xml" },
  })
}
