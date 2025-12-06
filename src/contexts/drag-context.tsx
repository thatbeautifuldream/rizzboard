"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

const DragInstanceIdContext = createContext<symbol | null>(null)

function getInstanceId() {
  return Symbol("drag-instance-id")
}

interface Props {
  children: ReactNode
}

export function DragInstanceIdProvider({ children }: Props) {
  const [instanceId] = useState(getInstanceId)

  return (
    <DragInstanceIdContext.Provider value={instanceId}>
      {children}
    </DragInstanceIdContext.Provider>
  )
}

export function useDragInstanceId() {
  return useContext(DragInstanceIdContext)
}