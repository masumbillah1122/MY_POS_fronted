import React, { useEffect } from 'react'
import { Form, Input, Button, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from "axios";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const handlerSubmit = async (value) => {
    // console.log(value);
      
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const res = await axios.post("/api/users/login", value);
          message.success("User Login Successfully!");
          localStorage.setItem("auth", JSON.stringify(res.data));
          navigate("/");

        dispatch({
          type: "HIDE_LOADING",
        });

      } catch (error) {
         dispatch({
           type: "HIDE_LOADING",
         });
        message.error("Error!");
        console.log(error);
      }
  };

  useEffect(() => {
    localStorage.getItem("auth");
    navigate("/");
  }, [navigate]);

  return (
    <div className="form">
      <h2>MY POS</h2>
      <p>Login</p>
      <div className="form-group">
        <Form layout="vertical" onFinish={handlerSubmit}>
          <FormItem name="userId" label="User Id">
            <Input placeholder="User Id" />
          </FormItem>
          <FormItem name="password" label="Password">
            <Input type="password" placeholder="Password" />
          </FormItem>
          <div className="form-btn-add">
            <Button htmlType="submit" className="add-new">
              Login
            </Button>
            <Link className="form-other" to="/register">
              Register Here!
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login