import {
  Autocomplete,
  Box,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Authenticated } from "../components";
import profit from "../assets/images/profit.svg";
import { useMemo, useState } from "react";
import useQuery from "../hooks/useQuery";
import statisticService from "../services/statisticService";
import BarChart from "../components/BarChart";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const user = useSelector((store) => store.auth.user);
  const [revenueOption, setRevenueOption] = useState({
    year: new Date().getFullYear(),
  });

  const { data: revenueData, fetching: isLoading } = useQuery(
    () => statisticService.getRevenues(revenueOption),
    [revenueOption]
  );

  const { data: year, fetching: yearLoading } = useQuery(
    () => statisticService.getYearAvailable(),
    []
  );

  const labels = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], []);
  const data = {
    labels: labels.map((month) => `Tháng ${month}`),
    datasets: [
      {
        fill: true,
        label: "Doanh thu",
        data: revenueData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Doanh thu",
      },
    },
  };
  const handleChange = (value) => {
    setRevenueOption({...revenueData, year: value})
  }
  return (
    <Authenticated>
      <main id="dashboard_page">
        {user.userRoles?.findIndex((item) => item == "ROLE_ADMIN") > -1 && (
          <>
            <Typography textAlign={"center"} variant="h3">
              Thống kê
            </Typography>
            <Divider sx={{ marginTop: 2, marginBottom: 4 }} />
            <Grid container>
              <Grid
                item
                xs={12}
                borderTop={"1px solid black"}
                borderBottom={"1px solid black"}
                paddingY={2}
              >
                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                  <img src={profit} width={100} />
                  <Box>
                    <Typography variant="body1">Doanh thu</Typography>
                    <Typography variant="h6">
                      {revenueData.length > 0 &&
                        revenueData
                          .reduce((a, b) => a + b, 0)
                          .toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
            <Stack direction={"row"} alignItems={"center"} spacing={2} mt={2}>
              <Typography>Năm</Typography>
              {!yearLoading &&  <Autocomplete
                defaultValue={revenueOption.year}
                sx={{ mt: 2, flex: 1 }}
                disableClearable
                options={year}
                onChange={(e, value) => handleChange(value)}
                renderInput={(param) => (
                  <TextField onKeyDown={(e) => e.preventDefault()} {...param} />
                )}
              />}
             
            </Stack>

            {!isLoading && <BarChart data={data} options={options} />}
          </>
        )}
        {user.userRoles?.findIndex((item) => item == "ROLE_EDITOR") > -1 && (
          <Typography>
            Chào{" "}
            <Typography variant="h6" component={"span"}>
              {user.name}
            </Typography>
            , mừng bạn đến với website !
          </Typography>
        )}
      </main>
    </Authenticated>
  );
}
