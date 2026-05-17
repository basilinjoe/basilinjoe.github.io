"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface Command {
  cmd: string
  output: string[]
}

const COMMANDS: Command[] = [
  {
    cmd: "kubectl get pods -n production",
    output: [
      "NAME                      READY   STATUS    RESTARTS",
      "api-server-7d4b9c-xpk2    1/1     Running   0",
      "frontend-6f8cd9-m3n4      1/1     Running   0",
      "redis-cache-8k2p9         1/1     Running   0",
    ],
  },
  {
    cmd: "terraform plan -out=infra.plan",
    output: [
      "Refreshing Terraform state...",
      "Plan: 8 to add, 2 to change, 0 to destroy.",
      "✓ Saved the plan to: infra.plan",
    ],
  },
  {
    cmd: "az aks get-credentials --name prod-aks",
    output: [
      "Merged \"prod-aks\" as current context.",
      "✓ Kubeconfig updated successfully",
    ],
  },
  {
    cmd: "docker build -t app:v2.3.1 .",
    output: [
      "Step 1/5 : FROM node:18-alpine",
      "Step 4/5 : RUN npm ci --only=production",
      "Successfully built a1b2c3d4",
      "✓ Image ready for deployment",
    ],
  },
  {
    cmd: "helm upgrade --install myapp ./charts",
    output: [
      "Release \"myapp\" has been upgraded.",
      "STATUS: deployed",
      "✓ REVISION: 14 — Happy Helming!",
    ],
  },
]

type Phase = "typing" | "outputting" | "waiting"

export function TerminalAnimation() {
  const [cmdIdx, setCmdIdx] = useState(0)
  const [typed, setTyped] = useState("")
  const [shownLines, setShownLines] = useState<string[]>([])
  const [phase, setPhase] = useState<Phase>("typing")
  const [cursor, setCursor] = useState(true)

  // Blinking cursor
  useEffect(() => {
    const t = setInterval(() => setCursor((c) => !c), 530)
    return () => clearInterval(t)
  }, [])

  // State machine for terminal animation
  useEffect(() => {
    const cmd = COMMANDS[cmdIdx]

    if (phase === "typing") {
      if (typed.length < cmd.cmd.length) {
        const t = setTimeout(() => {
          setTyped(cmd.cmd.slice(0, typed.length + 1))
        }, 55)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase("outputting"), 400)
        return () => clearTimeout(t)
      }
    }

    if (phase === "outputting") {
      if (shownLines.length < cmd.output.length) {
        const t = setTimeout(() => {
          setShownLines((l) => [...l, cmd.output[l.length]])
        }, 320)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => {
          setCmdIdx((i) => (i + 1) % COMMANDS.length)
          setTyped("")
          setShownLines([])
          setPhase("typing")
        }, 2800)
        return () => clearTimeout(t)
      }
    }
  }, [cmdIdx, typed, shownLines, phase])

  return (
    <div className="font-mono text-sm bg-zinc-950 rounded-2xl h-full min-h-[260px] flex flex-col overflow-hidden">
      {/* macOS-style title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-zinc-800 flex-shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
        </div>
        <span className="text-zinc-500 text-xs mx-auto">zsh — cloud-dev</span>
      </div>

      {/* Terminal body */}
      <div className="flex-1 p-4 overflow-hidden">
        {/* Prompt + typed command */}
        <div className="flex items-start gap-0 flex-wrap">
          <span className="text-blue-400 text-xs">basilinjoe</span>
          <span className="text-zinc-500 text-xs">@</span>
          <span className="text-purple-400 text-xs">cloud-dev</span>
          <span className="text-zinc-400 text-xs">&nbsp;%&nbsp;</span>
          <span className="text-white text-xs">{typed}</span>
          <span
            className={`inline-block w-[7px] h-[14px] bg-white ml-px align-middle transition-opacity duration-75 ${
              cursor ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Output lines */}
        <div className="mt-2 space-y-px">
          {shownLines.map((line, i) => (
            <motion.div
              key={`${cmdIdx}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={`text-xs ${
                line.startsWith("✓")
                  ? "text-green-400"
                  : line.includes("Error") || line.includes("error")
                  ? "text-red-400"
                  : "text-zinc-400"
              }`}
            >
              {line}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
