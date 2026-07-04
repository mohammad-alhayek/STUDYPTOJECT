

let employees = [
    { id: 1, title: 'employe1' },
    { id: 2, title: 'employe2' },
    { id: 3, title: 'employee3' }
];

export const getEmployees=(req, res) => {
    res.json(employees);
};

export const getEmployee=(req, res) => {
    let param = parseInt(req.params.id);

    const emp = employees.find(p => p.id === param);

    if (emp) {
        res.json(emp);
    } else {
        res.status(404).send('error 404');
    }
};

export const addEmployee=(req,res)=>
    {
        const newEmployee=
        {
            id:employees.length+1, title:req.body.title

        }
        if (newEmployee ) {
            employees.push(newEmployee);
        res.json(employees);
    } else {
        res.status(404).send('error 404');
    }

    };