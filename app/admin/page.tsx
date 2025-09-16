import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, CreditCard, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"

// Mock data - in real app, this would come from API
const stats = {
  totalUsers: 1247,
  activeContracts: 892,
  monthlyRevenue: 45678.9,
  pendingPayments: 23,
  newUsersThisMonth: 156,
  contractsThisMonth: 89,
}

const recentActivities = [
  {
    id: 1,
    type: "contract",
    message: "Nouveau contrat Auto Premium souscrit par Marie Dupont",
    time: "Il y a 5 minutes",
    status: "success",
  },
  {
    id: 2,
    type: "payment",
    message: "Paiement de 49.99€ reçu pour le contrat AUTO-2024-001",
    time: "Il y a 12 minutes",
    status: "success",
  },
  {
    id: 3,
    type: "user",
    message: "Nouvel utilisateur inscrit: pierre.martin@email.com",
    time: "Il y a 1 heure",
    status: "info",
  },
  {
    id: 4,
    type: "payment",
    message: "Échec de paiement pour le contrat HAB-2024-002",
    time: "Il y a 2 heures",
    status: "error",
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <p className="text-muted-foreground">Vue d'ensemble de votre plateforme d'assurance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs Total</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{stats.newUsersThisMonth} ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contrats Actifs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeContracts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{stats.contractsThisMonth} ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus Mensuels</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.monthlyRevenue.toLocaleString()}€</div>
            <p className="text-xs text-muted-foreground">+12.5% vs mois dernier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paiements en Attente</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingPayments}</div>
            <p className="text-xs text-muted-foreground">Nécessite attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Activités Récentes</CardTitle>
            <CardDescription>Dernières actions sur la plateforme</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === "success"
                        ? "bg-green-500"
                        : activity.status === "error"
                          ? "bg-red-500"
                          : "bg-primary"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertes Système</CardTitle>
            <CardDescription>Notifications importantes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium">23 paiements en échec</p>
                  <p className="text-xs text-muted-foreground">Nécessite un suivi client</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Sauvegarde automatique réussie</p>
                  <p className="text-xs text-muted-foreground">Dernière sauvegarde: il y a 2h</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">15 contrats à renouveler</p>
                  <p className="text-xs text-muted-foreground">Dans les 30 prochains jours</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
