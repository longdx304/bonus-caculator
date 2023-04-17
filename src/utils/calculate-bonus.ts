import { Employee } from '@/pages';

enum DON_GIA {
  SOAN = 24,
  LAI = 16,
  PHU = 8,
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
  for (const name of names) {
    // check if employee already in list
    const index = employees.findIndex((employee) => employee.name === name);
    // if not in list
    if (index === -1) {
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

      switch (bonusType) {
        case BONUS_TYPES.NGUOI_XU_LY:
          employees[arrayLength - 1].bonus.depSoan = totalDep;
          employees[arrayLength - 1].bonus.bonusDepSoan =
            (DON_GIA.SOAN / names.length) * totalDep;
          break;
        case BONUS_TYPES.PHU_XE:
          employees[arrayLength - 1].bonus.phuXe = totalDep;
          employees[arrayLength - 1].bonus.bonusPhuXe =
            (DON_GIA.PHU / names.length) * totalDep;
          break;
        default:
          employees[arrayLength - 1].bonus.laiXe = totalDep;
          employees[arrayLength - 1].bonus.bonusLaiXe =
            (DON_GIA.LAI / names.length) * totalDep;
      }
    } else {
      switch (bonusType) {
        case BONUS_TYPES.NGUOI_XU_LY:
          employees[index].bonus.depSoan! += totalDep;
          employees[index].bonus.bonusDepSoan! +=
            (DON_GIA.SOAN / names.length) * totalDep;
          break;
        case BONUS_TYPES.PHU_XE:
          employees[index].bonus.phuXe! += totalDep;
          employees[index].bonus.bonusPhuXe! +=
            (DON_GIA.PHU / names.length) * totalDep;
          break;
        default:
          employees[index].bonus.laiXe! += totalDep;
          employees[index].bonus.bonusLaiXe! +=
            (DON_GIA.LAI / names.length) * totalDep;
      }
    }
  }
};
