import boto3
import os

dynamodb = boto3.resource('dynamodb')
notesTable = dynamodb.Table(os.environ['dynamodbTable'])


def lambda_handler(event, context):
    notesTable.update_item(Key={
        "username": event['username'],
        "creation_timestamp": event["creation_timestamp"]
    }, AttributeUpdates={
        "note": {"Value": event['updatedNote']}
    },)

    return {
        'statusCode': 200,
    }
