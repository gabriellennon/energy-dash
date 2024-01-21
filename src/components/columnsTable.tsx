import { TMeasurementColumns, TMeasurementEnergyObject, TMeasurementLineChartProps } from '@/utils/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from './ui/button';

export const columnsTable: ColumnDef<TMeasurementEnergyObject>[] = [
    {
        accessorKey: 'agent',
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Agente
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        }
    },
    {
        accessorKey: 'meter',
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Ponto
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        }
    },
    {
        accessorKey: 'reference',
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Data
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        }
    },
    {
        accessorKey: 'hour',
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Hora
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        }
    },
    {
        accessorKey: 'consumption',
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Consumo Ativo (MWh)
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        }
    },
    {
        accessorKey: 'origin',
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Origem
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        }
    }
]