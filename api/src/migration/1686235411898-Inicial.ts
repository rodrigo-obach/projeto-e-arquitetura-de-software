import { MigrationInterface, QueryRunner } from "typeorm";

export class Inicial1686235411898 implements MigrationInterface {
    name = 'Inicial1686235411898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`grupo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(200) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`remessa\` (\`id\` int NOT NULL AUTO_INCREMENT, \`descricao\` varchar(200) NOT NULL, \`data\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pacote\` (\`id\` int NOT NULL AUTO_INCREMENT, \`identificador\` varchar(100) NOT NULL, \`prazoEntrega\` date NOT NULL, \`destinatario\` varchar(200) NOT NULL, \`endereco\` varchar(500) NOT NULL, \`complemento\` varchar(100) NOT NULL, \`latitude\` double NOT NULL, \`longitude\` double NOT NULL, \`remessaId\` int NULL, UNIQUE INDEX \`IDX_a056d24a0955c47d95756f50dd\` (\`identificador\`), INDEX \`IDX_9083ad8973a0a463e17142ea88\` (\`remessaId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`permissao\` (\`id\` int NOT NULL AUTO_INCREMENT, \`chave\` varchar(200) NOT NULL, \`nome\` varchar(200) NOT NULL, UNIQUE INDEX \`IDX_45f26998f57112672b02dcb5d9\` (\`chave\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`provedor\` varchar(30) NOT NULL, \`idProvedor\` varchar(200) NULL, \`nome\` varchar(300) NOT NULL, \`email\` varchar(320) NOT NULL, \`ativo\` tinyint NOT NULL, \`grupoId\` int NULL, INDEX \`IDX_db32910efad9dce9fbce417338\` (\`grupoId\`), UNIQUE INDEX \`IDX_096b5fe6575dc3b208082599c4\` (\`email\`, \`provedor\`), UNIQUE INDEX \`IDX_9b961a158cf8614bb3a0051022\` (\`idProvedor\`, \`provedor\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`grupo_permissoes_permissao\` (\`grupoId\` int NOT NULL, \`permissaoId\` int NOT NULL, INDEX \`IDX_d72f562434b2e2ff0a4e6e411c\` (\`grupoId\`), INDEX \`IDX_08fe3a1c1b8c9b875c41576d88\` (\`permissaoId\`), PRIMARY KEY (\`grupoId\`, \`permissaoId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`pacote\` ADD CONSTRAINT \`FK_9083ad8973a0a463e17142ea88c\` FOREIGN KEY (\`remessaId\`) REFERENCES \`remessa\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD CONSTRAINT \`FK_db32910efad9dce9fbce417338a\` FOREIGN KEY (\`grupoId\`) REFERENCES \`grupo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`grupo_permissoes_permissao\` ADD CONSTRAINT \`FK_d72f562434b2e2ff0a4e6e411cf\` FOREIGN KEY (\`grupoId\`) REFERENCES \`grupo\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`grupo_permissoes_permissao\` ADD CONSTRAINT \`FK_08fe3a1c1b8c9b875c41576d884\` FOREIGN KEY (\`permissaoId\`) REFERENCES \`permissao\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`grupo_permissoes_permissao\` DROP FOREIGN KEY \`FK_08fe3a1c1b8c9b875c41576d884\``);
        await queryRunner.query(`ALTER TABLE \`grupo_permissoes_permissao\` DROP FOREIGN KEY \`FK_d72f562434b2e2ff0a4e6e411cf\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP FOREIGN KEY \`FK_db32910efad9dce9fbce417338a\``);
        await queryRunner.query(`ALTER TABLE \`pacote\` DROP FOREIGN KEY \`FK_9083ad8973a0a463e17142ea88c\``);
        await queryRunner.query(`DROP INDEX \`IDX_08fe3a1c1b8c9b875c41576d88\` ON \`grupo_permissoes_permissao\``);
        await queryRunner.query(`DROP INDEX \`IDX_d72f562434b2e2ff0a4e6e411c\` ON \`grupo_permissoes_permissao\``);
        await queryRunner.query(`DROP TABLE \`grupo_permissoes_permissao\``);
        await queryRunner.query(`DROP INDEX \`IDX_9b961a158cf8614bb3a0051022\` ON \`usuario\``);
        await queryRunner.query(`DROP INDEX \`IDX_096b5fe6575dc3b208082599c4\` ON \`usuario\``);
        await queryRunner.query(`DROP INDEX \`IDX_db32910efad9dce9fbce417338\` ON \`usuario\``);
        await queryRunner.query(`DROP TABLE \`usuario\``);
        await queryRunner.query(`DROP INDEX \`IDX_45f26998f57112672b02dcb5d9\` ON \`permissao\``);
        await queryRunner.query(`DROP TABLE \`permissao\``);
        await queryRunner.query(`DROP INDEX \`IDX_9083ad8973a0a463e17142ea88\` ON \`pacote\``);
        await queryRunner.query(`DROP INDEX \`IDX_a056d24a0955c47d95756f50dd\` ON \`pacote\``);
        await queryRunner.query(`DROP TABLE \`pacote\``);
        await queryRunner.query(`DROP TABLE \`remessa\``);
        await queryRunner.query(`DROP TABLE \`grupo\``);
    }

}
