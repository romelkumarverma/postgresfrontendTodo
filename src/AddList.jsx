import { useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table'
import Swal from 'sweetalert2'



function AddList() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    ////////////// For edit     ////////////

    const [show1, setShow1] = useState(false);

    const handleClose1 = () => setShow1(false);
    const [iddata, setIdData] = useState('')
    console.log(iddata)
    const handleShow1 = (id) => {
        console.log(id)
        setIdData(id)
        setShow1(true);
    }

    const [editList, setEditList] = useState({
        id: '',
        task: '',
        due_date: '',
        completion_date: ''
    });
    const handleSubmitEdit = (id) => {
        // e.preventDefault();
        axios.put(`http://localhost:5200/api/todo/update/${iddata}`, editList)
            .then((res) => {
                console.log(res)
                setEditList(res.data.rows)
            }).catch((err) => {
                console.log(err)
            })
    }


    ////////////////////////////////////////////


    ////////////////////  Delete    /////////////////
    //const [dlt, setDlt] = useState()
    // const navigate = useNavigate()
    // const handleDelete = (id) => {
        
    //     axios.delete(`http://localhost:5200/api/todo/delete/${id}`)
    //         .then((res) => {
    //             console.log(res)
    //             alert("Data deleted successfully...")
                    
    //             // setDlt(res.data.row)
    //         }).catch((err) => {
    //             alert("Data  not deleted")
    //             console.log(err)
    //         })
    // }
    const [data, setData] = useState()
    const [idToDelete, setIdToDelete] = useState()

    const handleDelete = () => {
        setData(data.filter((item) => item.id !== idToDelete));
        setIdToDelete("");
      };
    
       
       const deleteTodoid = async (id) => {
        const response = await axios
          .delete(`http://localhost:5200/api/todo/delete/${id}`)
          .then(() => {
            fetchTodo();
            // setLoading(true);
          })
          .catch((err) => {
            console.log(err);
          });
        // setDataId(response.data);
      };
    
      const handleConfirmation = (id) => {
        // Example of a confirmation dialog
        Swal.fire({
          title: "Are you sure?",
          text: "You will not be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
        }).then((result) => {
          if (result.isConfirmed) {
            deleteTodoid(id);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            fetchTodo();
          }
        });
      };


    //////////////////////////////////////////////



    const [add, setAdd] = useState({
        id: '',
        task: '',
        // status: '',
        due_date: '',
        completion_date: '',

    })

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5200/api/todo/post', add)
            .then((result) => {
                console.log(result)
                alert("Posted successfully....")
            }).catch((err) => {
                console.log(err);
            })
    }



    const [showData, setShowData] = useState([])
    //const navigate = useNavigate();
    const fetchTodo = () =>{
        axios.get('http://localhost:5200/api/todo/get')
            .then((res) => {
                console.log(res)
                setShowData(res.data.rows)
            }).catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        fetchTodo();

    }, []);

    return (
        <>
            <Button variant="success" onClick={handleShow} style={{ marginLeft: '50px', marginTop: '30px' }}>
                Add List
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex justify-content-center align-items-center mt-3'>
                        <div className='p-3 rounded w-50 border'>
                            <form className='row g-1' onSubmit={handleSubmit}>

                                <div className='col-12'>
                                    <label htmlFor="id" className='form-label'>
                                        Id
                                    </label>
                                    <input type='text' className='form-control rounded-0'
                                        id='id'
                                        placeholder='Enter id'
                                        onChange={(e) => setAdd({ ...add, id: e.target.value })}
                                    />
                                </div>
                                <div className='col-12'>
                                    <label htmlFor="text" className='form-label'>
                                        Task
                                    </label>
                                    <input type='text' className='form-control rounded-0'
                                        id='text'
                                        placeholder='Enter Task'
                                        onChange={(e) => setAdd({ ...add, task: e.target.value })}
                                    />
                                </div>

                                <div className='col-12'>
                                    <label htmlFor="date" className='form-label'>
                                        Due Date
                                    </label>
                                    <input type='date' className='form-control rounded-0'
                                        id='date'
                                        placeholder='Enter Due Date'
                                        onChange={(e) => setAdd({ ...add, due_date: e.target.value })}
                                    />
                                </div>
                                <div className='col-12'>
                                    <label htmlFor="date" className='form-label'>
                                        Completion Date
                                    </label>
                                    <input type='date' className='form-control rounded-0'
                                        id='date'
                                        placeholder='Enter Completion Date'
                                        onChange={(e) => setAdd({ ...add, completion_date: e.target.value })}
                                    />
                                </div>



                                <div className='col-12'>
                                    <button className='btn btn-primary w-100 rounded-0 mb-2'>Add Employee</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </Modal.Body>
                
            </Modal>
            <div className='px-5 mt-3'>
                
                
                <div className='mt-3'>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Task</th>
                                <th>Due Date</th>
                                <th>Completion Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                showData.map((e) => {
                                    return (<>

                                        <tr>
                                            <td>{e.id}</td>
                                            <td>{e.task}</td>
                                            <td>{e.due_date}</td>
                                            <td>{e.completion_date}</td>
                                            <td>{e.status}</td>
                                            
                                            <td>
                                                <Button onClick={() => handleShow1(e.id)} className='btn btn-info btn-sm me-2'>Edit</Button>
                                                <button className='btn btn-warning btn-sm' onClick={() => {
                                                    handleConfirmation(e.id);
                                                    handleDelete();

                                                } }>Delete</button>
                                                {/* <button className='btn btn-warning btn-sm'>Delete</button> */}
                                            </td>
                                        </tr>
                                    </>)
                                }

                                )
                            }

                        </tbody>
                    </Table>
                </div>

                {/* For edit */}

                <Modal
                    show={show1}
                    onHide={handleClose1}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='d-flex justify-content-center align-items-center mt-3'>
                            <div className='p-3 rounded w-50 border'>
                                <form className='row g-1' onSubmit={handleSubmitEdit}>

                                    <div className='col-12'>
                                        <label htmlFor="id" className='form-label'>
                                            Id
                                        </label>
                                        <input type='text' className='form-control rounded-0'
                                            id='id'
                                            placeholder='Enter id'
                                            value={iddata}
                                        // onChange={(e) => setEditList({ ...editList, id: e.target.value })}
                                        />
                                    </div>
                                    <div className='col-12'>
                                        <label htmlFor="text" className='form-label'>
                                            Task
                                        </label>
                                        <input type='text' className='form-control rounded-0'
                                            id='text'
                                            placeholder='Enter Task'
                                            onChange={(e) => setEditList({ ...editList, task: e.target.value })}
                                        />
                                    </div>

                                     <Form.Select>
                                       
                                        {
                                            showData.map((item)=>
                                            <option>{item.status}</option>
                                            // <option value="Pending">Pending</option>
                                        )
                                        }
                                
                                {/* <option value="Progress">Progress</option>
                                <option value="Completed">Completed</option> */}
                                </Form.Select>

                                    <div className='col-12'>
                                        <label htmlFor="date" className='form-label'>
                                            Due Date
                                        </label>
                                        <input type='date' className='form-control rounded-0'
                                            id='date'
                                            placeholder='Enter Due Date'
                                            onChange={(e) => setEditList({ ...editList, due_date: e.target.value })}
                                        />
                                    </div>
                                    <div className='col-12'>
                                        <label htmlFor="date" className='form-label'>
                                            Completion Date
                                        </label>
                                        <input type='date' className='form-control rounded-0'
                                            id='date'
                                            placeholder='Enter Completion Date'
                                            onChange={(e) => setEditList({ ...editList, completion_date: e.target.value })}
                                        />
                                    </div>

                                    <div className='col-12'>
                                        <button className='btn btn-primary w-100 rounded-0 mb-2'>Edit List</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}

export default AddList;