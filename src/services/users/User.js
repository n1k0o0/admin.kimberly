import { getPrintableSchoolStatuses } from '../schools/School'

export const UserTypes = {
  school: 'school',
};

export function getPrintableUserTypes() {
  return {
    school: 'Школа',
  };
}

export function getPrintableUserType(type) {
  const types = getPrintableUserTypes();
  if (types.hasOwnProperty(type)) {
    return types[type];
  }

  return '';
}

export const UserStatuses = {

};

export function getPrintableUserStatuses() {
  return {
    email_verification: 'Ожидает подтверждения email',
    approved: 'Подтвержден',
    not_approved: 'Не подтвержден',
    active: 'Активен',
    disabled: 'Заблокирован',
  };
}
export function getPrintableUserStatus(type) {
  const types = getPrintableUserStatuses();
  if (types.hasOwnProperty(type)) {
    return types[type];
  }

  return '';
}
