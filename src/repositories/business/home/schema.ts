import VersionableSchema from '../../versionable/VersionableSchema';
export default class HomeSchema extends VersionableSchema {
  constructor(options: any) {
    const baseSchema = {
        name: {
            required: true,
            type: String,
        },
    };

    super(baseSchema, options);
  }
}
