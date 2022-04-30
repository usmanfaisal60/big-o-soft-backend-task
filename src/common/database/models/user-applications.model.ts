import { UUIDV4 } from "sequelize";
import { TEXT } from "sequelize";
import { STRING } from "sequelize";
import { UUID } from "sequelize";
import { AllowNull, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Users } from "./users.model";

@Table({ tableName: "user_applications" })
export class UserApplications extends Model {
    @PrimaryKey
    @Column({ type: UUID, defaultValue: UUIDV4 })
    id: string;

    @ForeignKey(() => Users)
    @AllowNull(false)
    @Column({ type: UUID })
    userId: string;

    @AllowNull(false)
    @Column({ type: TEXT })
    linkedInUrl: string;

    @Column({ type: STRING })
    coverLetter?: string;

    @BelongsTo(() => Users)
    user: Users;
}
