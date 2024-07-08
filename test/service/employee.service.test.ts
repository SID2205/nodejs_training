import EmployeeRepository from "../../src/repository/employee.repository";
import Employee from "../../src/entity/employee.entity";
import EmployeeService from "../../src/service/employee.service";
import {when} from "jest-when"

describe("Employee Service", () => {
  let employeeRepository: EmployeeRepository;
  let employeeService: EmployeeService;

  beforeAll(() => {
    const dataSource = {
      getRepository: jest.fn(),
    };
    employeeRepository = new EmployeeRepository(
      dataSource.getRepository(Employee)
    ) as jest.Mocked<EmployeeRepository>;
    employeeService = new EmployeeService(employeeRepository);
  });

  it("should return all Employee", async () => {
    const mock = jest.fn(employeeRepository.find).mockResolvedValue([]);
    employeeRepository.find = mock;

    const users = await employeeService.getAllEmployee();
    expect(users).toEqual([]);
    expect(mock).toHaveBeenCalledTimes(1);
  });
  // it('it should return all employess by ID',async()=>{
  //     const mock=jest.fn(employeeRepository.findOneBy).mockResolvedValue({id:1,"name":"sample"}as Employee);
  //     employeeRepository.findOneBy=mock;

  //     const users= await employeeService.getEmployeeByID(1);
  //     expect(users?.name).toEqual("sample");
  //     expect(mock).toHaveBeenCalledTimes(1);
  // })

  it("it should return all employess by ID", async () => {
    const mock = jest.fn();
    when(mock)
      .calledWith({ id: 1 })
      .mockResolvedValue({ id: 1, name: "sample" } as Employee);
    employeeRepository.findOneBy = mock;

    const users = await employeeService.getEmployeeByID(1);
    expect(users?.name).toEqual("sample");
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
