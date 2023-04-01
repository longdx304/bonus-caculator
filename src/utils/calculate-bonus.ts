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
      const arrayLength = employees.push({ name, bonus: {} });

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
          if (employees[index].bonus.depSoan === undefined) {
            employees[index].bonus.depSoan = totalDep;
          } else {
            employees[index].bonus.depSoan! += totalDep;
          }

          if (employees[index].bonus.bonusDepSoan === undefined) {
            employees[index].bonus.bonusDepSoan =
              (DON_GIA.SOAN / names.length) * totalDep;
          } else {
            employees[index].bonus.bonusDepSoan! +=
              (DON_GIA.SOAN / names.length) * totalDep;
          }
          break;
        case BONUS_TYPES.PHU_XE:
          if (employees[index].bonus.phuXe === undefined) {
            employees[index].bonus.phuXe = totalDep;
          } else {
            employees[index].bonus.phuXe! += totalDep;
          }

          if (employees[index].bonus.bonusPhuXe === undefined) {
            employees[index].bonus.bonusPhuXe =
              (DON_GIA.PHU / names.length) * totalDep;
          } else {
            employees[index].bonus.bonusPhuXe! +=
              (DON_GIA.PHU / names.length) * totalDep;
          }
          break;
        default:
          if (employees[index].bonus.laiXe === undefined) {
            employees[index].bonus.laiXe = totalDep;
          } else {
            employees[index].bonus.laiXe! += totalDep;
          }

          if (employees[index].bonus.bonusLaiXe === undefined) {
            employees[index].bonus.bonusLaiXe =
              (DON_GIA.LAI / names.length) * totalDep;
          } else {
            employees[index].bonus.bonusLaiXe! +=
              (DON_GIA.LAI / names.length) * totalDep;
          }
      }
    }
  }
};
