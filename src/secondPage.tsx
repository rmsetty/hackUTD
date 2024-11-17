'use client'
import './App.css'

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

          <div className="flex flex-col p-6 mt-6 border-2 border-dashed border-gray-300 rounded-lg h-[600px]">
  {/* Document content area */}
  <div className="flex-1 overflow-auto flex items-center justify-center text-gray-500 dark:text-gray-400 mb-4">
    Document will be rendered here based on selected options
  </div>


  </div>
    {/* Button */}
    <div className="flex justify-end">
    <button className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 m-1.5">
  Download Presentation
</button>

</div>

<div className="mt-6 border-t pt-6">
  <h3 className="text-lg font-semibold mb-4">Communicate with AI Assistant to Generate Document</h3>
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

              <Tabs defaultValue="template" className="w-full">
                <TabsList className="flex justify-start space-x-2.5"> {/* Align the tabs to the left */}
                  <TabsTrigger 
                    value="template" 
                    className="bg-white text-black border dark:bg-gray-700 dark:text-white"
                  >
                    Template
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
                <TabsContent value="template" className="py-4">
  <div className="grid grid-cols-1 gap-4">

    {/* Document Upload Section */}
    <div className="overflow-auto p-6 mt-6 border-2 border-dashed border-gray-300 rounded-lg h-[600px] flex items-center justify-center text-gray-500 dark:text-gray-400">
  <div className="text-center">
    <h2 className="text-xl font-semibold mb-4">Upload Document Templates</h2>
    <p className="mb-4">Upload your document templates here so the AI assistant can reference them.</p>

    {/* File Upload Button */}
    <div className="flex justify-center items-center border-2 border-dashed border-gray-300 p-6 rounded-lg mb-6">
      <label className="cursor-pointer text-blue-500">
        <input type="file" className="hidden" />
        <span className="text-lg">Click or Drag to Upload Template</span>
      </label>
    </div>

    {/* Uploaded Files List */}
    <div className="text-left">
      <h3 className="text-lg font-semibold mb-2">Uploaded Templates</h3>
      <ul className="list-disc pl-5 text-gray-700 dark:text-gray-200">
        <li className="mb-1 flex items-center justify-between">
          <a href="/path/to/Template1.docx" target="_blank" className="text-blue-500 hover:underline">
            Template 1.docx
          </a>
          {/* Remove Button */}
          <button className="ml-4 text-red-500 hover:text-red-700">
            Remove
          </button>
        </li>
        <li className="mb-1 flex items-center justify-between">
          <a href="/path/to/Template2.pdf" target="_blank" className="text-blue-500 hover:underline">
            Template 2.pdf
          </a>
          {/* Remove Button */}
          <button className="ml-4 text-red-500 hover:text-red-700">
            Remove
          </button>
        </li>
        <li className="mb-1 flex items-center justify-between">
          <a href="/path/to/Template3.txt" target="_blank" className="text-blue-500 hover:underline">
            Template 3.txt
          </a>
          {/* Remove Button */}
          <button className="ml-4 text-red-500 hover:text-red-700">
            Remove
          </button>
        </li>
      </ul>
    </div>
  </div>
</div>

  </div>

  {/* Section for Communication with AI Assistant */}
  
</TabsContent>




<TabsContent value="data" className="py-4">
  <div className="space-y-8">
    {/* Financial Data Section */}
    <div className="p-6 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-200 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Financial Data</h2>
      <p className="mb-4">Data table displaying financial market information will be shown below:</p>
      
      {/* Financial Data Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white dark:bg-gray-800">
          <thead>
            <tr className="text-left text-sm font-medium text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
              <th className="py-2 px-4">Company</th>
              <th className="py-2 px-4">Ticker</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Change</th>
              <th className="py-2 px-4">Volume</th>
              <th className="py-2 px-4">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {/* Blank rows for template */}
            <tr className="border-b border-gray-200 dark:border-gray-600">
              <td className="py-2 px-4 text-gray-900 dark:text-gray-200">Company Name</td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-200">Ticker</td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-200">$0.00</td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-200">+0.00%</td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-200">0</td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-200">$0.00B</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-600">
              <td className="py-2 px-4 text-gray-900 dark:text-gray-200">Company Name</td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-200">Ticker</td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-200">$0.00</td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-200">+0.00%</td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-200">0</td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-200">$0.00B</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-600">
              <td className="py-2 px-4 text-gray-900 dark:text-gray-200">Company Name</td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-200">Ticker</td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-200">$0.00</td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-200">+0.00%</td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-200">0</td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-200">$0.00B</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>



    {/* AI Assistant Communication Section */}
    <div className="p-6 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-200 shadow-lg">
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
        {/* File Upload Section */}
        <div className="overflow-auto p-6 mt-6 border-2 border-dashed border-gray-300 rounded-lg h-[600px] flex items-center justify-center text-gray-500 dark:text-gray-400">
  <div className="text-center">
    <h2 className="text-xl font-semibold mb-4">Upload Financial Data</h2>
    <p className="mb-4">Upload your financial data files here so they can be processed by the AI assistant.</p>

    {/* File Upload Button */}
    <div className="flex justify-center items-center border-2 border-dashed border-gray-300 p-6 rounded-lg mb-6">
      <label className="cursor-pointer text-blue-500">
        <input type="file" className="hidden" />
        <span className="text-lg">Click or Drag to Upload Data</span>
      </label>
    </div>

    {/* Uploaded Files List */}
    <div className="text-left">
      <h3 className="text-lg font-semibold mb-2">Uploaded Data Files</h3>
      <ul className="list-disc pl-5 text-gray-700 dark:text-gray-200">
        <li className="mb-1 flex items-center justify-between">
          <a href="/path/to/Data1.csv" target="_blank" className="text-blue-500 hover:underline">
            Data File 1.csv
          </a>
          {/* Remove Button */}
          <button className="ml-4 text-red-500 hover:text-red-700">
            Remove
          </button>
        </li>
        <li className="mb-1 flex items-center justify-between">
          <a href="/path/to/FinancialReport.pdf" target="_blank" className="text-blue-500 hover:underline">
            Financial Report Q1.pdf
          </a>
          {/* Remove Button */}
          <button className="ml-4 text-red-500 hover:text-red-700">
            Remove
          </button>
        </li>
        <li className="mb-1 flex items-center justify-between">
          <a href="/path/to/MarketAnalysis.xlsx" target="_blank" className="text-blue-500 hover:underline">
            Market Analysis.xlsx
          </a>
          {/* Remove Button */}
          <button className="ml-4 text-red-500 hover:text-red-700">
            Remove
          </button>
        </li>
      </ul>
    </div>
  </div>
</div>

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
