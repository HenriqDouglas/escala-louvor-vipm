import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";


export default function Admin() {

    const [disabled, setDisabled] = useState(false)
    const [password, setPassword] = useState("")

    async function handleClearAllData(event: any) {
        event.preventDefault();
        setDisabled(true);

        try {
            await axios.delete("/api/clearAllData", { data: { password } });
            alert("Dados apagados com sucesso!");
        } catch (e: unknown) {
            if (axios.isAxiosError(e) && e.response && e.response.status === 401) {
                alert("Você não tem permissão para apagar os dados!");
            } else {
                alert("Erro ao apagar os dados!");
            }
        } finally {
            setDisabled(false);
        }
    }

    return (
        <Container>
            <Form
                onSubmit={handleClearAllData}
            >
                <Form.Group className="mb-3">
                    <Form.Label>Deseja limpar todos os dados?</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={disabled}
                    >Limpar</Button>
                </Form.Group>
            </Form>
        </Container>
    );
}
