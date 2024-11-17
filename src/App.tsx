
import './App.css'
import logo from '@/assets/logo.png'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { Router, RouterProvider, Route, RootRoute, Outlet, Navigate } from '@tanstack/react-router'
// const rootRoute = new RootRoute({
//   component: () => <Outlet />,
//   errorComponent: ({ error }) => <ErrorBoundary error={error as Error} />
// })
// const queryClient = new QueryClient()

// const indexRoute = new Route({
//   getParentRoute: () => rootRoute,
//   path: '/',
//   component: () => <Navigate to="/home" />
// })
// const signupRoute = new Route({
//   getParentRoute: () => rootRoute,
//   path: '/signup',
//   //component: Signup,
// })
// const loginRoute = new Route({
//   getParentRoute: () => rootRoute,
//   path: '/login',
//   //component: Login,
// })
// const homeRoute = new Route({
//   getParentRoute: () => rootRoute,
//   path: '/home',
//   //component: Homepage,
// })
// const routeTree = rootRoute.addChildren([homeRoute, indexRoute, signupRoute, loginRoute])

// const router = new Router({ routeTree })
// function App() {

//   return (
//     <QueryClientProvider client={queryClient}>
//       <RouterProvider router={router} />
//     </QueryClientProvider>
//   )
// }
// const ErrorBoundary = ({ error }: { error: Error }) => {
//   return (
//     <div className="min-h-screen min-w-full flex items-center justify-center">
//       <div className="text-center">
//         <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
//         <p className="text-gray-600 mb-4">{error.message}</p>
//         <button
//           onClick={() => window.location.href = '/'}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Return Home
//         </button>
//       </div>
//     </div>
//   )
// }
// export default App

'use client'

import { useState, useEffect } from 'react'
import { BarChart, LineChart, ScatterChartIcon as ScatterPlot, PieChart, Share, Plus, Search, ChevronDown, Settings } from 'lucide-react'
// import { format } from 'date-fns'

import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function FinancialAssistant() {
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [queryType, setQueryType] = useState('market-trends')
  const [xAxis, setXAxis] = useState('time')
  const [yAxis, setYAxis] = useState('price')
  const [colorBy, setColorBy] = useState('sector')
  const [pointSize, setPointSize] = useState('medium')
  const [pointShape, setPointShape] = useState('circle')
  const [facetBy, setFacetBy] = useState('none')

  const [isDarkMode, setIsDarkMode] = useState(false)

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev)
  }

  // Update the timestamp
  const updateTimestamp = () => {
    setLastUpdated(new Date())
  }

  // Apply dark mode class to body element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <SidebarProvider>
      <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Left Sidebar */}
        <Sidebar className="w-64">
          <SidebarHeader>
            <h2 className="text-xl font-bold px-4 py-2 mt-[35px] text-black dark:text-gray-200">Financial Assistant</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-white dark:text-gray-400">Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem style={{ marginBottom: '5px' }}>
                    <SidebarMenuButton className="bg-white hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
                      <BarChart className="w-4 h-4 mr-2" />
                      Data Sources
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem style={{ marginBottom: '5px' }}>
                    <SidebarMenuButton className="bg-white hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
                      <LineChart className="w-4 h-4 mr-2" />
                      Analyses
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem style={{ marginBottom: '5px' }}>
                    <SidebarMenuButton className="bg-white hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
                      <ScatterPlot className="w-4 h-4 mr-2" />
                      Templates
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem style={{ marginBottom: '5px' }}>
                    <SidebarMenuButton className="bg-white hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
                      <PieChart className="w-4 h-4 mr-2" />
                      Visualizations
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-auto p-[30px]"> {/* Added 30px padding */}
        {/* Top Navigation Bar */}
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 p-4 flex justify-between items-center">
            <div className="flex items-center">
              <SidebarTrigger className="text-white bg-[#202c34] dark:text-[#202c34] dark:bg-white" />
              <h1 className="text-2xl font-bold ml-4 text-gray-900 dark:text-white">Financial Market Insights Assistant</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {/* Last updated: {format(lastUpdated, "MM/dd/yyyy, HH:mm:ss")} */}
              </span>
              <Button variant="outline" onClick={updateTimestamp}>
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
              <Button className="relative bg-black text-white hover:bg-black hover:text-black py-2 px-4 border border-black group">
                <span className="relative z-10"><span className="font-bold">+</span> Add New Query</span>
                <span className="absolute inset-0 bg-white transform scale-x-0 origin-left transition-transform duration-1000 ease-out group-hover:scale-x-100 z-0"></span>
              </Button>
              {/* Dark Mode Toggle Button */}
              <Button variant="outline" onClick={toggleDarkMode} className="ml-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </Button>
            </div>
          </header>

          {/* Placeholder for the actual chart */}
          <div className="flex-1 overflow-auto p-6 mt-6 border-2 border-dashed border-gray-300 rounded-lg h-[600px] flex items-center justify-center text-gray-500 dark:text-gray-400">
  Chart will be rendered here based on selected options
</div>
          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Communicate with AI Assistant</h3>
            <div className="bg-gray-100 p-4 rounded-lg mb-4 h-48 overflow-y-auto dark:bg-gray-800 dark:text-white">
              <div className="mb-2 text-left">
                <span className="inline-block p-2 rounded-lg bg-white dark:bg-gray-700">
                  Hello, how can I help you today?
                </span>
              </div>
              <div className="mb-2 text-right">
                <span className="inline-block p-2 rounded-lg bg-blue-500 text-white">
                  I need assistance with my project.
                </span>
              </div>
            </div>
            <form className="flex items-center">
            <input
    type="text"
    placeholder="Type your message here..."
    className="flex-grow mr-2 border p-2 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
  />
              <button type="submit" className="flex items-center bg-blue-500 text-white p-2 rounded-lg">
                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7-7 7M5 12h14" />
                </svg>
                Send
              </button>
            </form>
          </div>

          {/* Main Data Analysis and Query Panel */}
          <main className="flex-1 p-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
              <div className="mb-6 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <Select value={queryType} onValueChange={setQueryType}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select query type"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="market-trends">Market Trends</SelectItem>
                      <SelectItem value="portfolio-analysis">Portfolio Analysis</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search queries..."
                      className="pl-10 pr-4 py-2 w-64 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    />
                  </div>
                </div>
              </div>

              <Tabs defaultValue="chart" className="w-full">
                <TabsList className="flex justify-start space-x-2.5"> {/* Align the tabs to the left */}
                  <TabsTrigger 
                    value="chart" 
                    className="bg-white text-black border dark:bg-gray-700 dark:text-white"
                  >
                    Chart
                  </TabsTrigger>
                  <TabsTrigger 
                    value="data" 
                    className="bg-white text-black border dark:bg-gray-700 dark:text-white"
                  >
                    Data
                  </TabsTrigger>
                  <TabsTrigger 
                    value="style" 
                    className="bg-white text-black border dark:bg-gray-700 dark:text-white"
                  >
                    Style
                  </TabsTrigger>
                </TabsList>

                {/* Tabs Contents */}
                <TabsContent value="chart" className="py-4">
  <div className="grid grid-cols-2 gap-4">
    <div>
      <Label htmlFor="x-axis" className="text-gray-900 dark:text-gray-200">X-Axis</Label>
      <Select value={xAxis} onValueChange={setXAxis} className="border-gray-300 dark:border-gray-600 dark:bg-gray-800 bg-white">
        <SelectTrigger id="x-axis" className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200">
          <SelectValue placeholder="Select X-Axis" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
          <SelectItem value="time" className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Time</SelectItem>
          <SelectItem value="stock-ticker" className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Stock Ticker</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div>
      <Label htmlFor="y-axis" className="text-gray-900 dark:text-gray-200">Y-Axis</Label>
      <Select value={yAxis} onValueChange={setYAxis} className="border-gray-300 dark:border-gray-600 dark:bg-gray-800 bg-white">
        <SelectTrigger id="y-axis" className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200">
          <SelectValue placeholder="Select Y-Axis" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
          <SelectItem value="price" className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Price</SelectItem>
          <SelectItem value="volume" className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Volume</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div>
      <Label htmlFor="color-by" className="text-gray-900 dark:text-gray-200">Color By</Label>
      <Select value={colorBy} onValueChange={setColorBy} className="border-gray-300 dark:border-gray-600 dark:bg-gray-800 bg-white">
        <SelectTrigger id="color-by" className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200">
          <SelectValue placeholder="Color By" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
          <SelectItem value="sector" className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Sector</SelectItem>
          <SelectItem value="risk-level" className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Risk Level</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div>
      <Label htmlFor="point-size" className="text-gray-900 dark:text-gray-200">Point Size</Label>
      <Select value={pointSize} onValueChange={setPointSize} className="border-gray-300 dark:border-gray-600 dark:bg-gray-800 bg-white">
        <SelectTrigger id="point-size" className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200">
          <SelectValue placeholder="Point Size" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
          <SelectItem value="small" className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Small</SelectItem>
          <SelectItem value="medium" className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Medium</SelectItem>
          <SelectItem value="large" className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Large</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div>
      <Label htmlFor="point-shape" className="text-gray-900 dark:text-gray-200">Point Shape</Label>
      <Select value={pointShape} onValueChange={setPointShape} className="border-gray-300 dark:border-gray-600 dark:bg-gray-800 bg-white">
        <SelectTrigger id="point-shape" className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200">
          <SelectValue placeholder="Point Shape" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
          <SelectItem value="circle" className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Circle</SelectItem>
          <SelectItem value="square" className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Square</SelectItem>
          <SelectItem value="triangle" className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Triangle</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div>
      <Label htmlFor="facet-by" className="text-gray-900 dark:text-gray-200">Facet By</Label>
      <Select value={facetBy} onValueChange={setFacetBy} className="border-gray-300 dark:border-gray-600 dark:bg-gray-800 bg-white">
        <SelectTrigger id="facet-by" className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200">
          <SelectValue placeholder="Facet By" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
          <SelectItem value="none" className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">None</SelectItem>
          <SelectItem value="sector" className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Sector</SelectItem>
          <SelectItem value="market-cap" className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Market Cap</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
</TabsContent>


<TabsContent value="data" className="py-4">
  <div className="p-6 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-200">
    <p>Data table will be displayed here.</p>
  </div>
</TabsContent>
<TabsContent value="style" className="py-4">
  <div className="grid grid-cols-2 gap-4">
    <div>
      <Label htmlFor="color-scheme" className="text-gray-900 dark:text-gray-200">Color Scheme</Label>
      <Select defaultValue="default">
        <SelectTrigger id="color-scheme" className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200">
          <SelectValue placeholder="Select color scheme" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
          <SelectItem value="default" className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Default</SelectItem>
          <SelectItem value="monochrome" className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Monochrome</SelectItem>
          <SelectItem value="colorblind" className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Colorblind-friendly</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div>
      <Label htmlFor="font" className="text-gray-900 dark:text-gray-200">Font</Label>
      <Select defaultValue="sans-serif">
        <SelectTrigger id="font" className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200">
          <SelectValue placeholder="Select font" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
          <SelectItem value="sans-serif" className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Sans-serif</SelectItem>
          <SelectItem value="serif" className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Serif</SelectItem>
          <SelectItem value="monospace" className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Monospace</SelectItem>
        </SelectContent>
      </Select>
    </div>

  </div>
</TabsContent>


              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
