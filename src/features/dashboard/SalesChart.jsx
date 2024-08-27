import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ bookings, numDays }) {
  const colors = {
    totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
    extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
    text: "#374151",
    background: "#eee",
  };

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(new Date(booking.created_at), date))
        .reduce((acc, booking) => acc + booking.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(new Date(booking.created_at), date))
        .reduce((acc, booking) => acc + booking.extrasPrice, 0),
    };
  });

  console.log(data);

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDates.at(0), "MMM dd yyyy")} to{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}
      </Heading>
      <ResponsiveContainer height={300} width={`100%`}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray={"4"} />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
            }}
          />
          <XAxis
            dataKey="label"
            tick={{
              fill: colors.text,
              // fontSize: 12,
            }}
            tickLine={{
              stroke: colors.text,
            }}
          />
          <YAxis
            unit={"$"}
            tick={{
              fill: colors.text,
              // fontSize: 12,
            }}
            tickLine={{
              stroke: colors.text,
            }}
          />
          <Area
            dataKey={"totalSales"}
            type={"monotone"}
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total Sales"
            unit="$"
          />
          <Area
            dataKey={"extrasSales"}
            type={"monotone"}
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras Sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
