import React, { useState } from "react";
import { Link } from "react-router-dom";


const Login = ({ setUser }) => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");


        const handleLogin = (e) => {
                e.preventDefault();
                const loginInput = {
                    email,
                    password,
                };