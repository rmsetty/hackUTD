import { useState } from 'react'
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"





// Mock data for pie chart
const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

// Mock data for line graph
const lineData = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
]

export default function Component() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to the chat!", sender: "bot" }
  ])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { id: messages.length + 1, text: inputMessage, sender: "user" }])
      setInputMessage("")
    }
  }

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Pie Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                pie: {
                  label: "Pie Chart",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Line Graph</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                uv: {
                  label: "UV",
                  color: "hsl(var(--chart-1))",
                },
                pv: {
                  label: "PV",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="uv" stroke="var(--color-uv)" />
                  <Line type="monotone" dataKey="pv" stroke="var(--color-pv)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] mb-4">
            {messages.map((message:any) => (
              <div
                key={message.id}
                className={`mb-2 ${
                  message.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {message.text}
                </span>
              </div>
            ))}
          </ScrollArea>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Type a message..."
              value={inputMessage}
              onChange={(e:any) => setInputMessage(e.target.value)}
              onKeyPress={(e:any) => e.key === "Enter" && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
     
