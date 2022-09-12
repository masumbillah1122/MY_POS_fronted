import React, { useEffect } from 'react'
import { Form, message } from 'antd';
import FormItem from "antd/es/form/FormItem";
import { Input } from 'antd';
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from "axios";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlerSubmit = async (value) => {
        // console.log(value);

        try {
        dispatch({
          type: "SHOW_LOADING",
        });
        await axios.post("/api/users/register", value);
          message.success("Register Successfully!");
          navigate("/login");
          
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
  }
  
  useEffect(() => {
    localStorage.getItem("auth");
    navigate("/");
  }, [navigate]);

  return (
    <div className="form">
      <h2>MY POS</h2>
      <p>Register</p>
      <div className="form-group">
        <Form layout="vertical" onFinish={handlerSubmit}>
          <FormItem name="name" label="Name">
            <Input type="text" placeholder="Enter Name" />
          </FormItem>
          <FormItem name="userId" label="User Id">
            <Input placeholder="User Id" />
          </FormItem>
          <FormItem name="password" label="Password">
            <Input type="password" placeholder="Password" />
          </FormItem>
          <div className="form-btn-add">
            <Button htmlType="submit" className="add-new">
              Register
            </Button>
            <Link className="form-other" to="/login">
              Login Here!
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register
