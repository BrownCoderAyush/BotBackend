import AppDataSource from "../../../config/db";
import { Client } from "../../models/Client";
import { CreateClientDto } from "../dtos/createClientDtos";

export default class ClientService {
    async getAllClients(): Promise<Client[]> {
        return AppDataSource.manager.find(Client);
    }

    async getClientById(id: number): Promise<Client | null> {
        return AppDataSource.manager.findOneBy(Client, { id });
    }

    async createClient(data: CreateClientDto): Promise<Client> {
        const client = AppDataSource.manager.create(Client, data);
        return AppDataSource.manager.save(client);
    }

    async updateClient(id: number, data: Partial<Client>): Promise<Client | null> {
        const client = await AppDataSource.manager.findOneBy(Client, { id });
        if (!client) return null;
        Object.assign(client, data);
        return AppDataSource.manager.save(client);
    }

    async deleteClient(id: number): Promise<boolean> {
        const result = await AppDataSource.manager.delete(Client, id);
        return result.affected !== 0;
    }
}
