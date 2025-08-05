"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, RefreshCw, Download, AlertCircle } from "lucide-react"

// Mock data
const mockPayments = [
  {
    id: "1",
    contractNumber: "AUTO-2024-001",
    userName: "Marie Dupont",
    amount: 49.99,
    status: "PAID",
    paymentMethod: "card",
    dueDate: "2024-02-15",
    paidAt: "2024-02-15",
    stripePaymentId: "pi_1234567890",
  },
  {
    id: "2",
    contractNumber: "HAB-2024-002",
    userName: "Pierre Martin",
    amount: 34.99,
    status: "PENDING",
    paymentMethod: "sepa",
    dueDate: "2024-02-20",
    paidAt: null,
    stripePaymentId: null,
  },
  {
    id: "3",
    contractNumber: "AUTO-2024-003",
    userName: "Sophie Bernard",
    amount: 79.99,
    status: "FAILED",
    paymentMethod: "card",
    dueDate: "2024-02-18",
    paidAt: null,
    stripePaymentId: "pi_failed_123",
  },
  {
    id: "4",
    contractNumber: "AUTO-2024-001",
    userName: "Marie Dupont",
    amount: 49.99,
    status: "PAID",
    paymentMethod: "card",
    dueDate: "2024-01-15",
    paidAt: "2024-01-15",
    stripePaymentId: "pi_0987654321",
  },
]

export default function AdminPaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [payments] = useState(mockPayments)

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.userName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || payment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return <Badge className="bg-green-100 text-green-800">Payé</Badge>
      case "PENDING":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
      case "FAILED":
        return <Badge className="bg-red-100 text-red-800">Échec</Badge>
      case "CANCELLED":
        return <Badge variant="secondary">Annulé</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPaymentMethodBadge = (method: string) => {
    return method === "card" ? <Badge variant="outline">Carte</Badge> : <Badge variant="outline">SEPA</Badge>
  }

  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0)
  const paidAmount = filteredPayments
    .filter((payment) => payment.status === "PAID")
    .reduce((sum, payment) => sum + payment.amount, 0)
  const pendingAmount = filteredPayments
    .filter((payment) => payment.status === "PENDING")
    .reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Paiements</h1>
          <p className="text-muted-foreground">Suivez tous les paiements et prélèvements</p>
        </div>
        <Button>
          <RefreshCw className="mr-2 h-4 w-4" />
          Synchroniser Stripe
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total des Paiements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAmount.toFixed(2)}€</div>
            <p className="text-xs text-muted-foreground">{filteredPayments.length} transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Paiements Reçus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{paidAmount.toFixed(2)}€</div>
            <p className="text-xs text-muted-foreground">
              {filteredPayments.filter((p) => p.status === "PAID").length} payés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">En Attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingAmount.toFixed(2)}€</div>
            <p className="text-xs text-muted-foreground">
              {filteredPayments.filter((p) => p.status === "PENDING").length} en attente
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par contrat ou client..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="PAID">Payé</SelectItem>
                <SelectItem value="PENDING">En attente</SelectItem>
                <SelectItem value="FAILED">Échec</SelectItem>
                <SelectItem value="CANCELLED">Annulé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Paiements ({filteredPayments.length})</CardTitle>
          <CardDescription>Liste de tous les paiements de la plateforme</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contrat</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Méthode</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Échéance</TableHead>
                <TableHead>Payé le</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.contractNumber}</TableCell>
                  <TableCell>{payment.userName}</TableCell>
                  <TableCell className="font-medium">{payment.amount}€</TableCell>
                  <TableCell>{getPaymentMethodBadge(payment.paymentMethod)}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>{new Date(payment.dueDate).toLocaleDateString("fr-FR")}</TableCell>
                  <TableCell>{payment.paidAt ? new Date(payment.paidAt).toLocaleDateString("fr-FR") : "-"}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {payment.status === "FAILED" && (
                        <Button variant="ghost" size="icon" className="text-red-600">
                          <AlertCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
