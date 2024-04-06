/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function Calculator() {
  const [oddA, setOddA] = useState<number | null>(null)
  const [valueA, setValueA] = useState<number | null>(null)
  const [oddB, setOddB] = useState<number | null>(null)
  const [valueB, setValueB] = useState<number | null>(null)
  const [resultA, setResultA] = useState<number | null>(null)
  const [resultB] = useState<number | null>(null)
  const [profitA, setProfitA] = useState<number | null>(null)
  const [profitB] = useState<number | null>(null)
  const [profitTotal] = useState<number | null>(null)
  const [tableData, setTableData] = useState<any>([])
  // Function to handle changes in Odd A
  const handleOddAChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(event.target.value)
      setOddA(newValue)
    },
    [],
  )

  // Function to handle changes in Value A
  const handleValueAChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(event.target.value)
      setValueA(newValue)
    },
    [],
  )

  // Function to handle changes in Odd B
  const handleOddBChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(event.target.value)
      setOddB(newValue)
    },
    [],
  )

  useEffect(() => {
    if (oddA !== null && valueA !== null) {
      setResultA(oddA * valueA)
      setProfitA(resultA! - valueA)
    }
  }, [oddA, resultA, valueA])
  useEffect(() => {
    const data = []

    for (let i = 11; i <= 50; i++) {
      const oddValue = i / 10

      const auxResultB = oddValue * valueB!
      const auxValueB = resultA! / oddValue
      const auxProfitB = auxValueB * oddValue - auxValueB - valueA!
      const auxPercentage = (auxProfitB / profitA!) * 100

      const auxProfitA = profitA! + auxProfitB - profitA!
      console.log('A', auxValueB, oddValue, auxResultB, auxValueB)
      data.push({
        oddB: oddValue.toFixed(2),
        valueB: auxValueB.toFixed(2),
        resultB: auxResultB.toFixed(2),
        profitB: auxProfitB.toFixed(2),
        profitA: auxProfitA.toFixed(2),
        percentage: isNaN(auxPercentage.toFixed(2))
          ? 0
          : auxPercentage.toFixed(2),
      })
    }
    setTableData(data)
  }, [profitA, resultA, valueA, valueB])
  const calculateFreebetProfit = () => {
    const data = []

    for (let i = 11; i <= 50; i++) {
      const oddValue = i / 10

      const auxResultB = oddValue * valueB!
      const auxValueB = resultA! / oddValue
      const auxProfitB = auxValueB * oddValue - auxValueB - valueA!

      const auxProfitA = profitA! + auxProfitB - profitA!

      data.push({
        oddB: oddValue.toFixed(2),
        valueB: auxValueB.toFixed(2),
        resultB: auxResultB.toFixed(2),
        profitB: auxProfitB.toFixed(2),
        profitA: auxProfitA.toFixed(2),
      })
    }
    setTableData(data)
  }
  console.log('DATA', tableData)
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Calculadora WinWin
        </h1>
        <div className="grid grid-cols-5 gap-4">
          <Card className="col-span-2">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold">TIME A</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <Label>Odd</Label>
                  <Input
                    placeholder="0.0"
                    type="number"
                    value={oddA !== null ? oddA : ''}
                    onChange={handleOddAChange}
                  />
                </div>
                <div className="flex flex-col">
                  <Label>Valor</Label>
                  <Input
                    placeholder="R$0,00"
                    type="number"
                    value={valueA !== null ? valueA : ''}
                    onChange={handleValueAChange}
                  />
                </div>
                <div className="flex flex-col">
                  <Label>Resultado</Label>
                  <Input
                    placeholder="R$0,00"
                    type="number"
                    value={resultA !== null ? resultA : ''}
                    readOnly
                  />
                </div>
                <div className="flex flex-col">
                  <Label>Lucro</Label>
                  <Input
                    placeholder="R$0,00"
                    type="number"
                    value={profitA !== null ? profitA : ''}
                    readOnly
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>Lucro Total</CardHeader>
            <CardContent className="space-y-1">
              <Input
                disabled
                placeholder="R$0,00"
                type="number"
                value={profitTotal !== null ? profitTotal : ''}
                readOnly
              />
            </CardContent>
          </Card>
          <Card className="col-span-2">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold">TIME B</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <Label>Odd</Label>
                  <Input
                    placeholder="0.0"
                    type="number"
                    value={oddB !== null ? oddB : ''}
                    onChange={handleOddBChange}
                  />
                </div>
                <div className="flex flex-col">
                  <Label>Valor</Label>
                  <Input
                    placeholder="R$0,00"
                    type="number"
                    value={valueB !== null ? valueB : ''}
                    onChange={(event) =>
                      setValueB(parseFloat(event.target.value))
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <Label>Resultado</Label>
                  <Input
                    placeholder="R$0,00"
                    type="number"
                    value={resultB !== null ? resultB : ''}
                    readOnly
                  />
                </div>
                <div className="flex flex-col">
                  <Label>Lucro</Label>
                  <Input
                    placeholder="R$0,00"
                    type="number"
                    value={profitB !== null ? profitB : ''}
                    readOnly
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Button className="w-36" onClick={calculateFreebetProfit}>
            FREEBET
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Table className="col-span-4 rounded-md border">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ODD</TableHead>
                <TableHead className="w-[80px]">Valor</TableHead>
                <TableHead className="w-[120px]">Lucro TIME B</TableHead>
                <TableHead className="w-[120px]">Lucro TIME A</TableHead>
                <TableHead className="w-[120px]">%</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {tableData.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{item.oddB}</TableCell>
                    <TableCell>{item.valueB}</TableCell>
                    <TableCell
                      className={`${item.profitB < 0 ? 'text-red-400' : 'text-green-400'}`}
                    >
                      {item.profitB}
                    </TableCell>
                    <TableCell
                      className={`${item.profitB < 0 ? 'text-red-400' : 'text-green-400'}`}
                    >
                      {item.profitA}
                    </TableCell>
                    <TableCell
                      className={`${item.profitB < 0 ? 'text-red-400' : 'text-green-400'}`}
                    >
                      {item.percentage} %
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
