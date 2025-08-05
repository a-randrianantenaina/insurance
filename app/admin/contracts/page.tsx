"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Download, Edit } from "lucide-react"

// Mock data
const mockContracts = [
  {
    id: "1",
    contractNumber: "AUTO-2024-001",
    userEmail: "marie.dupont@email.com",
    userName: "Marie Dupont",
    offerName: "Auto Confort",
    status: "ACTIVE",
    monthlyPremium: 49.99,
    startDate: "2024-01-15",
    endDate: "2025-01-15",
    signedAt: "2024-01-15",
  },
  {
    id: "2",
    contractNumber: "HAB-2024-002",
    userEmail: "pierre.martin@email.com",
    userName: "Pierre Martin",
    offerName: "Habitation Plus",
    status: "ACTIVE",
    monthlyPremium: 34.99,
    startDate: "2024-02-01",
    endDate: "2025-02-01",
    signedAt: "2024-02-01",
  },
  {
    id: "3",
    contractNumber: "AUTO-2024-003",
    userEmail: "sophie.bernard@email.com",
    userName: "Sophie Bernard",
    offerName: "Auto Premium",
    status: "PENDING_SIGNATURE",
    monthlyPremium: 79.99,
    startDate: "2024-02-15",
    endDate: "2025-02-15",
    signedAt: null,
  },
]

export default function AdminContractsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [contracts] = useState(mockContracts)

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.offerName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || contract.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>
      case "PENDING_SIGNATURE":
        return <Badge className="bg-yellow-100 text-yellow-800">En attente signature</Badge>
      case "CANCELLED":
        return <Badge className="bg-red-100 text-red-800">Annulé</Badge>
      case "EXPIRED":
        return <Badge variant="secondary">Expiré</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Contrats</h1>
          <p className="text-muted-foreground">Suivez et gérez tous les contrats d'assurance</p>
        </div>
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
                  placeholder="Rechercher par numéro, client ou offre..."
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
                <SelectItem value="ACTIVE">Actif</SelectItem>
                <SelectItem value="PENDING_SIGNATURE">En attente signature</SelectItem>
                <SelectItem value="CANCELLED">Annulé</SelectItem>
                <SelectItem value="EXPIRED">Expiré</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Contracts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Contrats ({filteredContracts.length})</CardTitle>
          <CardDescription>Liste de tous les contrats de la plateforme</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N° Contrat</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Offre</TableHead>
                <TableHead>Prime/mois</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Début</TableHead>
                <TableHead>Fin</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell className="font-medium">{contract.contractNumber}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{contract.userName}</p>
                      <p className="text-sm text-muted-foreground">{contract.userEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>{contract.offerName}</TableCell>
                  <TableCell>{contract.monthlyPremium}€</TableCell>
                  <TableCell>{getStatusBadge(contract.status)}</TableCell>
                  <TableCell>{new Date(contract.startDate).toLocaleDateString("fr-FR")}</TableCell>
                  <TableCell>{new Date(contract.endDate).toLocaleDateString("fr-FR")}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
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
