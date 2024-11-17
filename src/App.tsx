"use client"

import { useState, useCallback, useEffect } from "react"
import ReactFlow, {
    Node,
    Edge,
    Controls,
    Background,
    MiniMap,
    MarkerType,
    useNodesState,
    useEdgesState,
} from "reactflow"
import "reactflow/dist/style.css";
import {Outlet,Router, RouterProvider, Route, RootRoute} from '@tanstack/react-router'
import { Loader2, Send, DownloadCloud, BarChart4, PieChart, TrendingUp, DollarSign, Sun, Moon } from 'lucide-react'
import { saveAs } from 'file-saver'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import FinancialAssistant from "./firstPage";
import SecondPage from "./secondPage";
import FinancialKnowledgeGraph from "./ni";

interface GraphNode {
    id: string
    name: string
    category: string
    description: string
}

interface Message {
    role: 'user' | 'assistant'
    content: string
    sources?: string[]
}

interface GraphData {
    nodes: { id: number; name: string; category: string; description: string }[]
    edges: Array<{ source: number; target: number; label: string }>
}
const rootRoute = new RootRoute({
  component:()=> <Outlet/>
})
const index = new Route({
  getParentRoute:()=>rootRoute,
  path:'/',
  component:FinancialKnowledgeGraph,

})
const secondPage = new Route({
  getParentRoute:()=>rootRoute,
  path:'/secondpage',
  component:SecondPage
})
const routeTree = rootRoute.addChildren({index,secondPage})
const router = new Router({routeTree});
export default function App(){
  return(
    <RouterProvider router={router}/>
  )
}