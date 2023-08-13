import dayjs from "dayjs";
import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  Cell,
  TooltipProps,
} from "recharts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useURLQuery } from "@hooks/useQueryParams";
import { useFetchRatingChange } from "@features/achievement/useFetchRatingChange";
import { RatingChange } from "@features/achievement/ratingChange";
import {
  ratingColor,
  ratingColorInfo,
  getColorCodeFromRating,
} from "@features/color/ratingColor";
import { NoDataMessage } from "@features/ui/component/NoDataBlock";

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          backgroundColor: "#ffffff",
          p: 1,
          borderRadius: 1,
          maxWidth: 300,
        }}
      >
        <Typography variant="subtitle2" noWrap>
          Contest: {payload[0].payload.contestName}
        </Typography>
        <Typography variant="subtitle2">
          Rating: {payload[0].payload.newRating}
        </Typography>
      </Box>
    );
  }

  return null;
};

export const Rating: React.FC = () => {
  const { queryParams } = useURLQuery();
  const userId = queryParams["userId"];

  const { data }: { data?: RatingChange[] } = useFetchRatingChange({
    userId,
  });

  // unixTime を年数に変換
  const dataWithYear = data?.map((d) => ({
    ...d,
    year: dayjs.unix(d.ratingUpdateTimeSeconds).year(),
  }));

  const uniqueYears = Array.from(new Set(dataWithYear?.map((d) => d.year)));

  return (
    <>
      {dataWithYear && dataWithYear.length === 0 && (
        <NoDataMessage title="No Rating Change Data" message="This " />
      )}
      {dataWithYear && dataWithYear.length > 0 && (
        <>
          <Box sx={{ p: 1 }}>
            <Typography variant="h6" gutterBottom>
              Rating Change
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            {dataWithYear && (
              <ResponsiveContainer width="100%" aspect={2}>
                <ScatterChart
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid />
                  <XAxis dataKey="year" name="time" ticks={uniqueYears} />
                  <YAxis
                    type="number"
                    dataKey="newRating"
                    name="rating"
                    ticks={[
                      ...ratingColor.map(
                        (color) => ratingColorInfo[color].lowerBound
                      ),
                      5000,
                    ]}
                  />
                  {ratingColor.map((color) => (
                    <ReferenceArea
                      y1={ratingColorInfo[color].lowerBound}
                      y2={ratingColorInfo[color].upperBound}
                      fill={ratingColorInfo[color].colorCode}
                      fillOpacity={0.6}
                    />
                  ))}
                  <Scatter
                    name={`${userId}'s rating`}
                    data={dataWithYear}
                    fill="#8884d8"
                    shape="circle"
                    stroke="#eeeeee"
                    line={{ stroke: "#cccccc" }}
                  >
                    {dataWithYear.map((entry, index) => {
                      const colorCode = getColorCodeFromRating(entry.newRating);
                      return <Cell key={`cell-${index}`} fill={colorCode} />;
                    })}
                  </Scatter>
                  <Tooltip content={<CustomTooltip />} />{" "}
                  {/* Customized tooltip */}
                </ScatterChart>
              </ResponsiveContainer>
            )}
          </Box>
        </>
      )}
    </>
  );
};
