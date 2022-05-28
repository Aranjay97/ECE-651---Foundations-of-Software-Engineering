// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing';
// import { LoginService } from './login.service';

// describe('LoginService', () => {
//   let service: LoginService;
//   let httpTestingController: HttpTestingController;

//   const mockData = {
//     "status": "success", 
//     "data": [{
//       "firstname": "Jane", 
//       "lastname": "Doe", 
//       "id": 34,
//       "dob": "11-02-2002"
//     },
//     {
//        "firstname": "John", 
//        "lastname": "Doe", 
//        "id": 2, 
//        "dob": "22-09-2000" 
//      }]
//     };
    

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule]
//     });
//     service = TestBed.inject(LoginService);
//     httpTestingController = TestBed.get(HttpTestingController);
//   });
//   afterEach(() => { 
//     httpTestingController.verify(); 
//    }); 

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
//   // it('delete should make a DELETE HTTP request with id appended to end of url', () => {
//   //   service.delemployee(3).subscribe(res => {
//   //     expect(res).toBe(3); 
//   //   }); 
//   //   const req = httpTestingController.expectOne('apiUrl/delete_employee/3/', 'delete to api');
//   //   expect(req.request.method).toBe('DELETE');
//   //   expect(req.cancelled).toBeFalsy(); 
//   //   expect(req.request.responseType).toEqual('json');
//   //   req.flush(3);
//   //   httpTestingController.verify();
//   // });

//   // it('update should make a PUT HTTP request with id appended to end of url and resource as body', () => {
//   //   const updateObj = { First_Name: "updatedName" };
//   //   service.changepdet(updateObj, 1).subscribe(res => {
//   //     expect(res.firstName).toBe('updatedName'); 
//   //   }); 
//   //   const req = httpTestingController.expectOne('apiUrl/updatePersonalDetails/1', 'put to api');
//   //   expect(req.request.method).toBe('PUT');
//   //   expect(req.request.body).toBe(updateObj);
//   //   expect(req.cancelled).toBeFalsy(); 
//   //   expect(req.request.responseType).toEqual('json');
//   //   req.flush(updateObj);
//   //   httpTestingController.verify();
//   // });


//   // it('create should make a POST HTTP request with resource as body', () => {
//   //   const createObj = { firstName: "updatedName" };
//   //   service.addemployee(createObj).subscribe(res => {
//   //     expect(res.firstName).toBe('updatedName'); 
//   //   }); 
//   //   const req = httpTestingController.expectOne('apiUrl/add_employee', 'post to api');
//   //   expect(req.request.method).toBe('POST');
//   //   expect(req.request.body).toBe(createObj);
//   //   expect(req.cancelled).toBeFalsy(); 
//   //   expect(req.request.responseType).toEqual('json');
//   //   req.flush(createObj);
//   //   httpTestingController.verify();
//   //   });



//   it('getAll should make a GET HTTP request and return all data items', () => {
//     service.getAll().subscribe((res: any) => {
//       expect(res).toEqual(mockData); 
//       expect(res.data.length).toBe(2); 
//     }); 
//     const req = httpTestingController.expectOne('apiUrl');
//     expect(req.request.method).toBe('GET');
//     expect(req.cancelled).toBeFalsy(); 
//     expect(req.request.responseType).toEqual('json');
//     req.flush(mockData);
//     httpTestingController.verify();
//   });
//   it('getById should make a GET HTTP request with id appended to end of url', () => {
//     service.getById(1).subscribe(res => {
//       expect(res).toEqual(mockData); 
//     }); 
//     const req = httpTestingController.expectOne('apiUrl/1');
//     expect(req.request.method).toBe('GET');
//     expect(req.cancelled).toBeFalsy(); 
//     expect(req.request.responseType).toEqual('json');
//     req.flush(mockData);
//     httpTestingController.verify();
//   });
//   it('delete should make a DELETE HTTP request with id appended to end of url', () => {
//     service.delete(1).subscribe(res => {
//       expect(res).toBe(1); 
//     }); 
//     const req = httpTestingController.expectOne('apiUrl/1', 'delete to api');
//     expect(req.request.method).toBe('DELETE');
//     expect(req.cancelled).toBeFalsy(); 
//     expect(req.request.responseType).toEqual('json');
//     req.flush(1);
//     httpTestingController.verify();
//   });
//   it('update should make a PUT HTTP request with id appended to end of url and resource as body', () => {
//     const updateObj = { firstName: "updatedName" };
//     service.update(updateObj, 1).subscribe((res: any) => {
//       expect(res.firstName).toBe('updatedName'); 
//     }); 
//     const req = httpTestingController.expectOne('apiUrl/1', 'put to api');
//     expect(req.request.method).toBe('PUT');
//     expect(req.request.body).toBe(updateObj);
//     expect(req.cancelled).toBeFalsy(); 
//     expect(req.request.responseType).toEqual('json');
//     req.flush(updateObj);
//     httpTestingController.verify();
//   });
//   it('create should make a POST HTTP request with resource as body', () => {
//     const createObj = { firstName: "updatedName" };
//     service.create(createObj).subscribe((res: any) => {
//       expect(res.firstName).toBe('updatedName'); 
//     }); 
//     const req = httpTestingController.expectOne('apiUrl', 'post to api');
//     expect(req.request.method).toBe('POST');
//     expect(req.request.body).toBe(createObj);
//     expect(req.cancelled).toBeFalsy(); 
//     expect(req.request.responseType).toEqual('json');
//     req.flush(createObj);
//     httpTestingController.verify();
//     });
    
// });
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


