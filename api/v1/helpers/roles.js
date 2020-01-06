import Accesscontrol from 'accesscontrol';

const ac = new Accesscontrol();

const roles = (() => {
  ac.grant('pharmacist')
    .readOwn('pharm')
    .updateOwn('pharm');

  ac.grant('admin')
    .readAny('pharm')
    .updateAny('pharm')
    .deleteAny('pharm');

  return ac;
})();

export default roles;
