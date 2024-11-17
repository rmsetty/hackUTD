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
import { useNavigate } from "@tanstack/react-router";
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

export default function FinancialKnowledgeGraph() {
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const [inputText, setInputText] = useState<string>("")
    const [chatInput, setChatInput] = useState<string>("")
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(false)
    const [chatLoading, setChatLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [darkMode, setDarkMode] = useState(false)

    const sendChatMessage = async () => {
        if (!chatInput.trim()) return

        setChatLoading(true)
        const userMessage: Message = { role: 'user', content: chatInput }
        setMessages(prev => [...prev, userMessage])
        setChatInput('')

        const nodesAndEdges = {
            message: chatInput,
            nodes: nodes.map(node => ({
                id: node.id,
                name: node.data.label,
                category: node.data.category,
                description: node.data.description,
            })),
            edges: edges.map(edge => ({
                source: edge.source,
                target: edge.target,
                label: edge.label,
            })),
        }

        try {
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nodesAndEdges),
            })

            if (!response.ok) throw new Error('Failed to get response')

            const data = await response.json()
            const assistantMessage: Message = {
                role: 'assistant',
                content: data.response,
            }

            setMessages(prev => [...prev, assistantMessage])
        } catch (error) {
            setError('Failed to get response from finance assistant')
        } finally {
            setChatLoading(false)
        }
    }
    const navigate = useNavigate();
        const generatePpt = async () => {
        setLoading(true)
        setError(null)
        try {
            const nodesData = nodes.map((node) => ({
                title: node.data.category,
                content: node.data.description || "No description available.",
            }))

            const response = await fetch("http://localhost:5000/api/generatePpt", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nodes: nodesData }),
            })

            if (!response.ok) {
                throw new Error("Failed to generate PowerPoint")
            }

            const blob = await response.blob()
            saveAs(blob, "FinancialAnalysis.pptx")
        } catch (err) {
            setError("Failed to generate PowerPoint. Please try again.")
        } finally {
            setLoading(false)
        }
    }


    const checkRagStatus = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/rag-status')
            const status = await response.json()

            if (!status.initialized) {
                setError("Finance assistant is still initializing. Some responses may be delayed.")
            }
        } catch (error) {
            console.error('Error checking RAG status:', error)
        }
    }

    const generateGraph = async (text: string) => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch("http://localhost:5000/generateGraph", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ inputText: text }),
            })

            if (!response.ok) {
                throw new Error("Failed to generate graph")
            }

            const rawResponse = await response.json()
            const data: GraphData = JSON.parse(rawResponse.response)

            if (!data.nodes || !data.edges || !Array.isArray(data.nodes) || !Array.isArray(data.edges)) {
                throw new Error("Invalid response structure: Missing nodes or edges")
            }

            const flowNodes: Node[] = data.nodes.map((node) => ({
                id: String(node.id),
                position: { x: Math.random() * 800, y: Math.random() * 600 },
                data: {
                    label: node.name,
                    category: node.category,
                    description: node.description,
                },
                style: {
                    background: getCategoryColor(node.category),
                    color: "#fff",
                    border: "1px solid #222138",
                    borderRadius: "8px",
                    padding: "10px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    width: 180,
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                },
            }))

            const flowEdges: Edge[] = data.edges.map((relation, index) => ({
                id: `edge-${index}`,
                source: String(relation.source),
                target: String(relation.target),
                label: relation.label,
                type: "smoothstep",
                animated: true,
                labelStyle: { fill: darkMode ? "#fff" : "#000", fontWeight: 700 },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: darkMode ? "#fff" : "#000",
                },
                style: { stroke: darkMode ? "#fff" : "#000" },
            }))

            setNodes(flowNodes)
            setEdges(flowEdges)
        } catch (error) {
            console.error("Error generating graph:", error)
            setError("Failed to generate graph. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const getCategoryColor = (category: string): string => {
        const colors: { [key: string]: string } = {
            person: "#4CAF50",
            organization: "#2196F3",
            location: "#9C27B0",
            event: "#FF9800",
            default: "#607D8B",
        }
        return colors[category.toLowerCase()] || colors.default
    }

    const handleSubmit = useCallback(() => {
        if (inputText.trim()) {
            generateGraph(inputText)
        }
    }, [inputText])

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors min-w-screen w-screen duration-300`}>
            <div className="container mx-auto ">
                <Card className={`w-full shadow-2xl ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>
                    <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src="/placeholder-logo.svg" alt="FinGraph Logo" />
                                    <AvatarFallback className="bg-blue-500 text-white">FG</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                                        FinGraph Insights
                                    </CardTitle>
                                    <CardDescription className="text-lg">
                                        Financial Knowledge Graph & AI Assistant
                                    </CardDescription>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="dark-mode"
                                    checked={darkMode}
                                    onCheckedChange={toggleDarkMode}
                                    className="data-[state=checked]:bg-blue-500"
                                />
                                <Label htmlFor="dark-mode" className="cursor-pointer">
                                    {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                                </Label>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <Tabs defaultValue="graph" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-2 rounded-lg bg-blue-100 p-1 dark:bg-gray-700">
                                <TabsTrigger
                                    value="graph"
                                    className="rounded-md py-2 px-4 data-[state=active]:bg-white data-[state=active]:text-blue-600 dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white"
                                >
                                    <BarChart4 className="w-5 h-5 mr-2 inline-block" />
                                    Knowledge Graph
                                </TabsTrigger>
                                <TabsTrigger
                                    value="chat"
                                    className="rounded-md py-2 px-4 data-[state=active]:bg-white data-[state=active]:text-blue-600 dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white"
                                >
                                    <TrendingUp className="w-5 h-5 mr-2 inline-block" />
                                    Finance Assistant
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="graph" className="space-y-4">
                                <div className="flex space-x-4 mb-4">
                                    <Textarea
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        placeholder="Enter financial data or concepts to generate a graph..."
                                        className="flex-grow resize-none border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-400"
                                    />
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="flex-shrink-0 bg-blue-500 hover:bg-blue-600 text-white"
                                    >
                                        {loading ? (
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        ) : (
                                            <PieChart className="mr-2 h-5 w-5" />
                                        )}
                                        Generate Graph
                                    </Button>
                                    <Button
                                        onClick={()=>{navigate({to:'/secondpage'})}}
                                        disabled={loading}
                                        className="flex-shrink-0 bg-blue-500 hover:bg-blue-600 text-white"
                                    >
                                        
                                        Navigate
                                    </Button>
                                </div>
                                <div className="h-[600px] border rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                                    <ReactFlow
                                        nodes={nodes}
                                        edges={edges}
                                        onNodesChange={onNodesChange}
                                        onEdgesChange={onEdgesChange}
                                        fitView
                                    >
                                        <Background color={darkMode ? "#333" : "#aaa"} gap={16} />
                                        <Controls />
                                        <MiniMap style={{ background: darkMode ? "#1f2937" : "#f3f4f6" }} />
                                    </ReactFlow>
                                </div>
                                <Button
                                    onClick={generatePpt}
                                    disabled={loading}
                                    className="mt-4 bg-green-500 hover:bg-green-600 text-white"
                                >
                                    {loading ? (
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        <DownloadCloud className="mr-2 h-5 w-5" />
                                    )}
                                    Export to PowerPoint
                                </Button>
                            </TabsContent>

                            <TabsContent value="chat" className="space-y-4">
                                <ScrollArea className="h-[500px] p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                                    {messages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`mb-4 ${msg.role === 'assistant' ? 'ml-4' : 'mr-4'
                                                }`}
                                        >
                                            <div
                                                className={`p-3 rounded-lg ${msg.role === 'assistant'
                                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                                                    : 'bg-gray-100 dark:bg-gray-700'
                                                    }`}
                                            >
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}
                                </ScrollArea>
                                <div className="flex space-x-2">
                                    <Textarea
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        placeholder="Ask about financial trends, analysis, or insights..."
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault()
                                                sendChatMessage()
                                            }
                                        }}
                                        className="flex-grow resize-none border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-400"
                                    />
                                    <Button
                                        onClick={sendChatMessage}
                                        disabled={chatLoading}
                                        className="flex-shrink-0 bg-blue-500 hover:bg-blue-600 text-white"
                                    >
                                        {chatLoading ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : (
                                            <Send className="h-5 w-5" />
                                        )}
                                    </Button>
                                </div>
                            </TabsContent>
                        </Tabs>

                        {error && (
                            <Alert variant="destructive" className="mt-4">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}