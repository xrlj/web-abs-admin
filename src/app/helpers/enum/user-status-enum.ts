export enum UserStatusEnum {
  CHECK_WAIT = 0, // 待审核
  CHECK_PASS, // 审核通过
  CHECK_FAILURE, // 审核不通过
  VERIFIED_PASS, // 已实名认证
  DISABLE, // 已禁用
  BLACK// 黑名单
}
