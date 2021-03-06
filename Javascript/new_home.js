let empPayrollList;

window.addEventListener('DOMContentLoaded',(event)=>
{
    
    empPayrollList= getEmployeePayrollDataFromStorage();
    
    document.querySelector(".emp-count").textContent= empPayrollList.length;
    
    createInnerHtml();
    
    localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage= ()=>{
    return localStorage.getItem('EmployeePayrollList')?JSON.parse(localStorage.getItem('EmployeePayrollList')):[];
}

const createInnerHtml=()=>
{
   
    if(empPayrollList.length==0) return;

    const headerHtml= "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>"
    
    let innerHtml= `${headerHtml}`;
   
    for(const empPayrollData of empPayrollList){
     
        innerHtml= `${innerHtml}
        <tr>
            <td><img class="profile" alt="" src="${empPayrollData._profilePic}"></td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>${getDeptHtml(empPayrollData._department)}
            </td>
            <td>${empPayrollData._salary}</td>
            <td>${stringifyDate(empPayrollData._startDate)}</td>
            <td><img id="${empPayrollData._id}" onclick= "remove(this)" alt="delete" src="C:\Users\abhis\OneDrive\Desktop\Day48\assets\assets\icons\delete-black-18dp.svg">
            <img id="${empPayrollData._id}" onclick= "update(this)" alt="edit" src="C:\Users\abhis\OneDrive\Desktop\Day48\assets\assets\icons\create-black-18dp.svg"></td>
        </tr>`;
    }
    
    document.querySelector('#table-display').innerHTML=innerHtml;
}


const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
      {       
        _name: 'Harish',
        _gender: 'male',
        _department: [
            'Engineering',
            'Finance'
        ],
        _salary: '500000',
        _startDate: '29 Oct 2019',
        _note: '',
        _id: new Date().getTime(),
        _profilePic: '../assets/profile-images/Ellipse -2.png'
      },
      {
        _name: 'Kumar',
        _gender: 'female',
        _department: [
            'Sales'
        ],
        _salary: '400000',
        _startDate: '29 Oct 2019',
        _note: '',
        _id: new Date().getTime() + 1,
        _profilePic: '../assets/profile-images/Ellipse -1.png'
      }
    ];
    return empPayrollListLocal;
  }

  const getDeptHtml= (deptList)=>
  {
      let deptHtml='';
      for(const dept of deptList)
      {
          deptHtml= `${deptHtml}<div class="dept-label">${dept}</div>`
      }
      return deptHtml;
  }

 
  const remove= (node)=>{
      
      let empPayrollData= empPayrollList.find(empData=>empData._id=node.id);
      
      if(!empPayrollData) return;
      
      const index= empPayrollList.map(empData=>empData._id).indexOf(empPayrollData.id);
      
      empPayrollList.splice(index,1);
      
      localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
     
      document.querySelector(".emp-count").textContent= empPayrollList.length;
     
      createInnerHtml();
  }

  
  const update= (node)=>{
     
      let empPayrollData= empPayrollList.find(empData=>empData._id== node.id);
    
      if(!empPayrollData) return;

      localStorage.setItem('editEmp',JSON.stringify(empPayrollData));
      
      window.location.replace(site_properties.emp_payroll_page);
  }