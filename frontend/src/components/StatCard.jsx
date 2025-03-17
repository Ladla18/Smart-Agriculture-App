// Shared Components
import { Card, CardContent } from "../components/ui/Card";
export const StatCard = ({ icon, title, value }) => (
  <Card>
    <CardContent className="flex items-center space-x-4 p-4">
      {icon}
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </CardContent>
  </Card>
);
