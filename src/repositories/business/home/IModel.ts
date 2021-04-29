import IVersionableDocument from '../../versionable/IVersionableDocument';

export default interface IHomeModel extends IVersionableDocument {
  id: string;
  name: string;
}
