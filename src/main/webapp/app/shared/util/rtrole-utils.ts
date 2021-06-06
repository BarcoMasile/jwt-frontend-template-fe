import {PrimeIcons, TreeNode} from 'primeng/api';
import {RTRole, RTRoleOriginal} from 'app/core/auth/account.model';

export class RTRoleUtils {

  static prettyAttributes(rtRoles: RTRoleOriginal[]): RTRole[] {
    return rtRoles.map(role => RTRoleUtils.rtRole(role));
  }

  static rtRole(role: RTRoleOriginal): RTRole {
    return { ...role, attributes: RTRoleUtils.attributes(role.attributes)}
  }

  static attributes(attributes: {[nomeAttributo: string]: { values: string[]} }): { [attributeName: string]: string[] } {
    return Object.keys(attributes).map(key => {
      return {name: key, values: attributes[key].values ?? []}
    }).reduce(RTRoleUtils.reducer, <{ [p: string]: string[] }>{});
  }

  static reducer(accumulator: {[p: string]: string[]}, currentValue: { name: string, values: string[]}) {
    accumulator[currentValue.name] = currentValue.values;
    return accumulator;
  }

  static treefyRoles(rtRoles: RTRole[]): TreeNode[] {
    return rtRoles
      .map(role => <TreeNode> {label: role.name, icon: PrimeIcons.TAG, data: role})
      .map(node => RTRoleUtils.treefyAttributes(node));
  }

  static treefyAttributes(node: TreeNode): TreeNode {
    const attributes = (<RTRole>node.data).attributes ?? {};
    node.children = Object.keys(attributes)
      .map(key => <TreeNode> { label: key, icon: PrimeIcons.TAGS, children: attributes[key].map(value => <TreeNode> { label: value, icon: PrimeIcons.TICKET, type: 'attribute'})});
    node.data = undefined;
    return node;
  }
}
