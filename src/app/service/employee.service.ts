import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

addEmpURL : string;
getEmpURL : string;
updateEmpUrl : string;
deleteEmpUrl : string;

  constructor(private http : HttpClient) {

    this.addEmpURL = 'http://localhost:9091/emp/addEmployee';
    this.getEmpURL = 'http://localhost:9091/emp/getAll';
    this.updateEmpUrl = 'http://localhost:9091/emp/addEmployee';
    this.deleteEmpUrl = 'http://localhost:9091/emp/updateEmployee';
}
addEmployee(emp : Employee): Observable<Employee>{
  return this.http.post<Employee>(this.addEmpURL, emp);
}
getAllEmployee(): Observable<Employee[]>{
   return this.http.get<Employee[]>(this.getEmpURL);
}

updateEmployee(emp :Employee) : Observable<Employee>{
return this.http.put<Employee>(this.updateEmpUrl, emp);
}

deleteEmployee(emp : Employee) : Observable<Employee>{
  return this.http.delete<Employee>(this.deleteEmpUrl+'/'+emp.employeeid);
}

}
