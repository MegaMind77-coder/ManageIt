import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetPassword } from '../../actions/resetActions';
import { clearErrors } from '../../actions/errorActions';

class ResetModal extends Component{

    state = {
        modal: false,
        newPassword: null,
        verifyPassword: null,
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        error: PropTypes.object.isRequired,
        resetPassword: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };


    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
          // Check for Reset error
          if (error.id === 'PASSWORD_RESET_FAIL') {
            this.setState({ msg: error.msg.msg });
          } else {
            this.setState({ msg: null });
          }
        }
    
        // If authenticated, close modal
        if (this.state.modal) {
          if (isAuthenticated) {
            this.toggle();
          }
        }
      }

    toggle = () => {
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const { newPassword, verifyPassword } = this.state;
        const Password = {
            newPassword,
            verifyPassword
        };
        this.props.resetPassword(Password);
        console.log(Password);
        this.toggle();
    };

    render(){
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Reset Password
                </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Reset Password</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (
                        <Alert color='danger'>{this.state.msg}</Alert>
                        ) : null} 
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='password'>New Password</Label>
                                <Input
                                    type="password"
                                    name="newPassword"
                                    id="newPassword"
                                    placeholder="New Password"
                                    className="mb-3"                            
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='password'>Re-Enter New Password</Label>
                                <Input
                                    type="password"
                                    name="verifyPassword"
                                    id="verifyPassword"
                                    placeholder="Re-Enter Password"
                                    className="mb-3"                            
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <Button color='dark' style={{ marginTop: '2rem' }} block>
                                Reset
                            </Button>
                        </Form>              
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, {resetPassword, clearErrors})(ResetModal);
