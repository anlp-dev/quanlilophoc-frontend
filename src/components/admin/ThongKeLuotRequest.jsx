import React, {useEffect, useState} from "react";
import {
    Card,
    Typography,
    TextField,
    Box,
    Slide,
    Paper,
    Fade,
} from "@mui/material";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";
import {Search as SearchIcon} from "@mui/icons-material";
import apiConfig from "../../configs/apiConfig.jsx";

const RequestStatistics = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${apiConfig.baseUrl}/system/statistics/requests`, {
                    method: "GET",
                    headers: apiConfig.getAuthHeaders(token)
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    console.error("Server error:", errorData);
                    return;
                }

                const res_data = await res.json();
                setDataChart(res_data?.data || []);
            } catch (error) {
                console.error("Network error:", error);
            }
        };

        fetchData();
    }, []);

    // Chuyển đổi dữ liệu từ API
    const chartData = dataChart.map((item) => ({
        time: `${item._id.year}-${item._id.month.toString().padStart(2, "0")}-${item._id.day
            .toString()
            .padStart(2, "0")} ${item._id.hour}:00`,
        count: item.count,
    }));

    // Tìm ngày có nhiều request nhất
    const maxRequest = Math.max(...dataChart.map((entry) => entry.count), 0); // Tránh lỗi khi dataChart rỗng
    const maxRequestDay = dataChart.find((entry) => entry.count === maxRequest)?.time;
    const totalRequests = dataChart.reduce((total, entry) => total + (entry.count || 0), 0);
    return (
        <Slide direction="up" in>
            <Paper
                elevation={4}
                sx={{
                    p: 3,
                    m: 'auto',
                    marginTop: 3,
                    width: '100%',
                    maxWidth: 1550,
                    borderRadius: 3,
                    boxShadow: 5,
                }}
            >
                <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                    Thống kê lượt request
                </Typography>
                <Fade in>
                    <Box>
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
                            <SearchIcon sx={{color: "#888"}}/>
                            <TextField
                                label="Tìm kiếm ngày"
                                variant="outlined"
                                size="small"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                sx={{flex: 1}}
                            />
                        </Box>

                        {/* Thống kê request nhiều nhất */}

                        <Typography
                            variant="body1"
                            sx={{
                                mb: 3,
                                color: "#3df60a",
                                fontWeight: "bold",
                                background: "#ebffe0",
                                padding: "10px",
                                borderRadius: 2,
                                boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            Tổng số request: ({totalRequests} requests)
                        </Typography>

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


                        {/* Biểu đồ */}
                        <ResponsiveContainer width="100%" height={600}>
                            {chartData.length > 0 ? (
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc"/>
                                    <XAxis
                                        dataKey="time"
                                        tick={{fontSize: 12, fill: "#555"}}
                                        tickLine={false}
                                        axisLine={{stroke: "#000000"}}
                                    />
                                    <YAxis
                                        tick={{fontSize: 12, fill: "#555"}}
                                        tickLine={false}
                                        axisLine={{stroke: "#000000"}}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#3f51b5",
                                            borderRadius: 10,
                                            color: "#fff",
                                            border: "none",
                                        }}
                                        labelStyle={{fontWeight: "bold", color: "#fff"}}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        stroke="url(#grad1)"
                                        strokeWidth={4}
                                        activeDot={{r: 8, fill: "#ff5722", strokeWidth: 3}}
                                        isAnimationActive={true}
                                        animationDuration={2000}
                                        animationEasing="ease-out"
                                        strokeDasharray="5 5"
                                    />
                                </LineChart>
                            ) : (
                                <Typography
                                    variant="h6"
                                    sx={{color: "#555", textAlign: "center", mt: 4}}
                                >
                                    Không có dữ liệu thống kê để hiển thị.
                                </Typography>
                            )}
                        </ResponsiveContainer>

                        {/* Gradient definition */}
                        <svg width="0" height="0">
                            <defs>
                                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" style={{stopColor: "#1976d2", stopOpacity: 1}}/>
                                    <stop offset="100%" style={{stopColor: "#ff5722", stopOpacity: 1}}/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </Box>
                </Fade>
            </Paper>
        </Slide>
    );
};

export default RequestStatistics;