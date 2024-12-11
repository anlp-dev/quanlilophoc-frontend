import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, TextField, Box } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Search as SearchIcon } from "@mui/icons-material";
import apiConfig from "../../configs/apiConfig.jsx";

const RequestStatistics = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('run')
                const res = await fetch(`${apiConfig.baseUrl}/system/statistics/requests`, {
                    method: "GET",
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    console.error("Server error:", errorData);
                }
                const res_data = await res.json();
                setDataChart(res_data?.data);
            } catch (error) {
                console.error("Network error:", error);
            }
        };

        fetchData();
    }, []);

    const chartData = dataChart.map((item) => ({
        time: `${item._id.year}-${item._id.month.toString().padStart(2, "0")}-${item._id.day
            .toString()
            .padStart(2, "0")} ${item._id.hour}:00`,
        count: item.count,
    }));

    const maxRequest = Math.max(...dataChart.map((entry) => entry.count));
    const maxRequestDay = dataChart.find((entry) => entry.count === maxRequest)?.time;

    return (
        <Card
            sx={{
                minWidth: 275,
                boxShadow: 15,
                borderRadius: 3,
                background: "linear-gradient(145deg, #f0f4f8, #e0e7ff)",  // Gradient background
                border: "1px solid #ccc",
            }}
        >
            <CardContent>
                <Typography
                    variant="h4"
                    component="div"
                    gutterBottom
                    sx={{
                        fontWeight: "bold",
                        color: "#3f51b5",
                        textAlign: "center",
                        mb: 3,
                    }}
                >
                    Thống Kê Lượt Request
                </Typography>

                {/* Tìm kiếm */}
                <Box
                    sx={{
                        mb: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        background: "#ffffff",
                        boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
                        borderRadius: 2,
                        padding: "8px",
                    }}
                >
                    <SearchIcon sx={{ color: "#888" }} />
                    <TextField
                        label="Tìm kiếm ngày"
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ flex: 1 }}
                    />
                </Box>

                {/* Thống kê request nhiều nhất */}
                {maxRequestDay && (
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 3,
                            color: "#d32f2f",
                            fontWeight: "bold",
                            background: "#ffe0e0",
                            padding: "10px",
                            borderRadius: 2,
                            boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        Ngày có số request nhiều nhất: {maxRequestDay} ({maxRequest} requests)
                    </Typography>
                )}

                {/* Biểu đồ */}
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                        <XAxis
                            dataKey="time"
                            tick={{ fontSize: 12, fill: "#555" }}
                            tickLine={false}
                            axisLine={{ stroke: "#ddd" }}
                        />
                        <YAxis
                            tick={{ fontSize: 12, fill: "#555" }}
                            tickLine={false}
                            axisLine={{ stroke: "#ddd" }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#3f51b5",
                                borderRadius: 10,
                                color: "#fff",
                                border: "none",
                            }}
                            labelStyle={{ fontWeight: "bold", color: "#fff" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke="url(#grad1)"  // Using gradient for line color
                            strokeWidth={4}
                            activeDot={{ r: 8, fill: "#ff5722", strokeWidth: 3 }}
                            isAnimationActive={true}
                            animationDuration={2000}
                            animationEasing="ease-out"
                            dot={{ stroke: "#fff", strokeWidth: 2, r: 6 }}
                            strokeDasharray="5 5"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>

            {/* Gradient definition */}
            <svg width="0" height="0">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: "#1976d2", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#ff5722", stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
            </svg>
        </Card>
    );
};

export default RequestStatistics;
