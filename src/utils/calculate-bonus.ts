import { Employee } from '@/pages';

enum DON_GIA {
  SOAN = 24,
  LAI = 12,
  PHU = 12,
}

export enum BONUS_TYPES {
  NGUOI_XU_LY = 'người xử lý đơn',
  LAI_XE = 'lái xe',
  PHU_XE = 'phụ xe',
}

export const calculateBonus = (
  bonusType: BONUS_TYPES,
  totalDep: number,
  allNames: string,
  employees: Employee[]
) => {
  const names = allNames.split(',');
  for (const unTrimname of names) {
    const name = unTrimname.trim();
    // check if employee already in list
    let employeeIndex = employees.findIndex(
      (employee) => employee.name === name
    );
    // if not in list
    if (employeeIndex === -1) {
      const arrayLength = employees.push({
        name,
        bonus: {
          depSoan: 0,
          laiXe: 0,
          phuXe: 0,
          bonusDepSoan: 0,
          bonusLaiXe: 0,
          bonusPhuXe: 0,
        },
      });
      employeeIndex = arrayLength - 1;
    }
    switch (bonusType) {
      case BONUS_TYPES.NGUOI_XU_LY:
        employees[employeeIndex].bonus.depSoan += totalDep;
        employees[employeeIndex].bonus.bonusDepSoan +=
          (DON_GIA.SOAN / names.length) * totalDep;
        break;
      case BONUS_TYPES.PHU_XE:
        employees[employeeIndex].bonus.phuXe += totalDep;
        employees[employeeIndex].bonus.bonusPhuXe +=
          (DON_GIA.PHU / names.length) * totalDep;
        break;
      default:
        employees[employeeIndex].bonus.laiXe += totalDep;
        employees[employeeIndex].bonus.bonusLaiXe +=
          (DON_GIA.LAI / names.length) * totalDep;
    }
  }
};
