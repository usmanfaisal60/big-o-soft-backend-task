import { UUID, UUIDV4, STRING } from "sequelize";
import { Column, PrimaryKey, Table, Model, AllowNull, Unique, HasMany, HasOne } from "sequelize-typescript";
import { USER_ROLES } from "../../constants/user-roles";
import { UserApplications } from "./user-applications.model";

@Table({ tableName: "users" })
export class Users extends Model {
    @PrimaryKey
    @Column({ type: UUID, defaultValue: UUIDV4 })
    id: string;

    @AllowNull(false)
    @Unique
    @Column({ type: STRING })
    email: string;

    @AllowNull(false)
    @Column({ type: STRING(255) })
    password: string;

    @AllowNull(false)
    @Column({ type: STRING, defaultValue: USER_ROLES.USER })
    role: USER_ROLES

    public async createApplication(data: ICreateApplication) {
        // TODO:// HANDLE COVER LETTER LATER

        await UserApplications.create({
            linkedInUrl: data.linkedInUrl,
            userId: this.id
        });

    }
}

export interface ICreateApplication {
    linkedInUrl: string;
    coverLetter?: Express.Multer.File;
}